import { z } from "zod"

export const streamerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  platform: z.enum(["Twitch", "YouTube", "Kick", "TikTok"]),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  description: z
    .string()
    .min(5, "Tell us a bit more!")
    .max(100, "You yap too much"),
})

export type Streamer = z.infer<typeof streamerSchema>
