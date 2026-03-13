import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware" // 1. Import middleware
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

// 2. Wrap the store logic in persist()
export const useStreamerStore = create<StreamerState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "streamer-storage", // 3. The key name in localStorage
      storage: createJSONStorage(() => localStorage), // 4. Define storage type
    }
  )
)



const StreamerList = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  const { streamers } = useStreamerStore()

  // Wait until the client-side mount is finished
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // If we haven't read from localStorage yet, show a loader or nothing
  if (!isHydrated) return <p>Syncing data...</p>

  return (
    // Your actual table code here
  )
}


__________


This is your focused guide for Zustand Persistence. Save this as Persistence_CheatSheet.md. It contains the exact modifications needed to turn your standard store into one that survives page refreshes.
💾 Zustand Persistence Guide
1. The "Persisted" Store
This logic wraps your existing store in the persist middleware. It automatically syncs the state to the browser's localStorage.
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
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

// NOTE: The double parentheses ()() are required for TS middleware compatibility
export const useStreamerStore = create<StreamerState>()(
  persist(
    (set) => ({
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

      addStreamer: async (newStreamer) => {
        try {
          const response = await axios.post(API_URL, newStreamer)
          set((state) => ({ streamers: [...state.streamers, response.data] }))
        } catch (err) { set({ error: "Add failed" }) }
      },

      deleteStreamer: async (id) => {
        try {
          await axios.delete(`${API_URL}/${id}`)
          set((state) => ({
            streamers: state.streamers.filter((s) => s.id !== id),
          }))
        } catch (err) { set({ error: "Delete failed" }) }
      },

      updateStreamer: async (id, updateData) => {
        try {
          const response = await axios.put(`${API_URL}/${id}`, updateData)
          set((state) => ({
            streamers: state.streamers.map((s) => s.id === id ? response.data : s),
          }))
        } catch (err) { set({ error: "Update failed" }) }
      },
    }),
    {
      name: "streamer-storage", // Key name in LocalStorage
      storage: createJSONStorage(() => localStorage), 
    }
  )
)

2. The Hydration Guard
When using persist, React might try to render the UI before the data is loaded from the disk. Use this pattern in your main list or layout to prevent Hydration Mismatch errors.
import { useEffect, useState } from "react"
import { useStreamerStore } from "./store/useStreamerStore"

export default function StreamerList() {
  const [isHydrated, setIsHydrated] = useState(false)
  
  // 1. Wait for the component to mount (client-side)
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // 2. Prevent rendering until the store is ready
  if (!isHydrated) return null 

  return (
    <div>
      {/* Your Table/List UI goes here */}
    </div>
  )
}

3. Exam Debugging Tips
How to check if it's working:
 * Open Browser DevTools (F12).
 * Go to the Application tab.
 * Select Local Storage on the left.
 * Look for the key streamer-storage. You should see your JSON data there.
How to reset the store:
If you mess up your data and want a fresh start, you have two options:
 * Manual: Right-click the key in the Application tab and hit Delete.
 * Code: Add a reset action to your store:
   clearStore: () => {
  localStorage.removeItem("streamer-storage");
  set({ streamers: [] });
}

Summary Checklist:
 * [ ] Did I import persist and createJSONStorage?
 * [ ] Does create<T>()(...) have the extra set of parentheses?
 * [ ] Did I name the storage key (e.g., "streamer-storage")?
 * [ ] Did I add the isHydrated check to the component?
Would you like me to add a section on how to "filter" what gets saved (e.g., saving the streamers but not saving the loading state)?

