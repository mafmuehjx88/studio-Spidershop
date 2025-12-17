'use server';
/**
 * @fileOverview A flow to send top-up notifications to a Telegram group.
 *
 * - sendTelegramNotification - A function that handles sending the notification.
 * - TelegramNotificationInput - The input type for the notification function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

const TelegramNotificationInputSchema = z.object({
  username: z.string().describe('The username of the person making the top-up request.'),
  receiptDataUri: z
    .string()
    .describe(
      "The receipt screenshot as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type TelegramNotificationInput = z.infer<typeof TelegramNotificationInputSchema>;

const BOT_TOKEN = '8518071078:AAH78XNAVopg9gD3KRXLZEW8HiNm1uZ3xqA';
const CHAT_ID = '-1003662310000';

async function sendPhotoToTelegram(photoDataUri: string, caption: string) {
    const base64Data = photoDataUri.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const mimeType = photoDataUri.match(/data:(image\/[^;]+);base64,/)?.[1] || 'image/png';
    const fileName = `receipt.${mimeType.split('/')[1]}`;


    const formData = new (await import('form-data')).default();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', imageBuffer, {
        filename: fileName,
        contentType: mimeType,
    });
    formData.append('caption', caption);

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Telegram API Error: ${response.statusText}, Body: ${errorBody}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error sending photo to Telegram:', error);
        throw error;
    }
}


const sendTelegramNotificationFlow = ai.defineFlow(
  {
    name: 'sendTelegramNotificationFlow',
    inputSchema: TelegramNotificationInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    const orderId = uuidv4().split('-')[0]; // Short, unique ID
    const now = new Date();
    const formattedTime = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).replace(/, /g, ', ');


    const caption = `
========================
✨ New Top-Up Request ✨
========================
👤 Username: ${input.username}
🆔 Order ID: #${orderId}
⏰ Time: ${formattedTime}
    `.trim();

    try {
        await sendPhotoToTelegram(input.receiptDataUri, caption);
        return { success: true };
    } catch (e) {
        console.error("Failed to send telegram notification", e);
        return { success: false };
    }
  }
);


export async function sendTelegramNotification(input: TelegramNotificationInput): Promise<{ success: boolean }> {
  return sendTelegramNotificationFlow(input);
}
