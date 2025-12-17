'use server';
/**
 * @fileOverview A flow to send top-up notifications to a Telegram group.
 *
 * - sendTelegramNotification - A function that handles sending the notification.
 * - TelegramNotificationInput - The input type for the notification function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

const TelegramNotificationInputSchema = z.object({
  username: z.string().describe('The username of the person making the request.'),
  receiptDataUri: z
    .string()
    .optional()
    .describe(
      "The receipt screenshot as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productName: z.string().optional().describe("The name of the game/product."),
  optionName: z.string().optional().describe("The specific item purchased."),
  price: z.string().optional().describe("The price of the item."),
  gameId: z.string().optional().describe("The in-game user ID."),
  serverId: z.string().optional().describe("The in-game server ID."),
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

async function sendMessageToTelegram(message: string) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown', // To allow for formatting like code blocks
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Telegram API Error: ${response.statusText}, Body: ${errorBody}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
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
    const orderId = uuidv4().split('-')[0].toUpperCase();
    const now = new Date();
    const formattedTime = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).replace(/, /g, ', ');

    // If receiptDataUri is present, it's a top-up request
    if (input.receiptDataUri) {
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
            console.error("Failed to send telegram photo notification", e);
            return { success: false };
        }
    } 
    // Otherwise, it's a direct purchase order
    else {
        const gameAccount = input.serverId 
            ? `\`${input.gameId} (${input.serverId})\``
            : `\`${input.gameId}\``;
        
        const message = `
========================
🎮 New Game Top-Up Order 🎮
========================
👤 Username: ${input.username}
🆔 Order ID: #${orderId}
⏰ Time: ${formattedTime}
---
🕹️ Game: ${input.productName}
💎 Item: ${input.optionName}
💳 Game Account: ${gameAccount}
🧑‍🎤 IGN: N/A
💰 Price: ${input.price}
        `.trim().replace(/ /g, ' ');

         try {
            await sendMessageToTelegram(message);
            return { success: true };
        } catch (e) {
            console.error("Failed to send telegram message notification", e);
            return { success: false };
        }
    }
  }
);


export async function sendTelegramNotification(input: TelegramNotificationInput): Promise<{ success: boolean }> {
  return sendTelegramNotificationFlow(input);
}
