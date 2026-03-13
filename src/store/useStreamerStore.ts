import { create } from "zustand"
import axios from "axios"
import type { Streamer } from "@/utils/streamerSchema"

interface StreamerState {
  streamers: Streamer[]
  loading: boolean
  error: string | null
  fetchStreamers: () => Promise<void>
  addStreamer: (newStreamer: Streamer) => Promise<void>
  deleteStreamer: (id: string) => Promise<void>
  updateStreamer: (id: string, updateData: Streamer) => Promise<void>
}

const API_URL = "http://localhost:3001/streamers"

export const useStreamerStore = create<StreamerState>((set) => ({
  streamers: [],
  loading: false,
  error: null,

  fetchStreamers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(API_URL)
      set({ streamers: response.data, loading: false })
    } catch (err) {
      set({ error: "Could not load streamers", loading: false })
    }
  },

  addStreamer: async (newStreamer: Streamer) => {
    try {
      const response = await axios.post(API_URL, newStreamer)
      set((state) => ({ streamers: [...state.streamers, response.data] }))
    } catch (err) {
      set({ error: "Failed to add streamer" })
    }
  },

  deleteStreamer: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`)

      set((state) => ({
        streamers: state.streamers.filter((streamer) => streamer.id !== id),
      }))
    } catch (err) {
      set({ error: "Failed to delete streamer" })
    }
  },

  updateStreamer: async (id: string, updateData: Streamer) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updateData)
      set((state) => ({
        streamers: state.streamers.map((s) =>
          s.id === id ? response.data : s
        ),
      }))
    } catch (err) {
      set({ error: "Failed to update streamer" })
    }
  },
}))
