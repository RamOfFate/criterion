import { useParams, useNavigate } from "react-router-dom"
import { useStreamerStore } from "@/store/useStreamerStore"
import { Button } from "./ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function StreamerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { streamers, fetchStreamers } = useStreamerStore()

  // Find the streamer in our store
  const streamer = streamers.find((s) => s.id === id)

  useEffect(() => {
    if (streamers.length === 0) {
      fetchStreamers()
    }
  }, [streamers.length, fetchStreamers])

  if (!streamer) {
    return (
      <div className="py-10 text-center">
        <p>Streamer not found.</p>
        <Button variant="link" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/streamers")}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to List
      </Button>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold">{streamer.name}</CardTitle>
          <CardAction>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary">{streamer.platform}</Badge>
              <Badge variant="outline">⭐ {streamer.rating} / 5</Badge>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-lg font-semibold">About this Creator</h3>
          <p className="leading-relaxed text-muted-foreground">
            {streamer.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 bg-muted/50 p-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/streamers/edit/${streamer.id}`)}
          >
            Edit Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
