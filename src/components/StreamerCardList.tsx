import { useStreamerStore } from "@/store/useStreamerStore"
import { SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "./ui/skeleton"

export default function StreamerCardList() {
  const navigate = useNavigate()

  const { streamers, fetchStreamers, loading, error } = useStreamerStore()

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchStreamers()
  }, [fetchStreamers])

  const filteredStreamers = streamers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.platform.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <p>Loading creators..</p>

  if (error) return <p className="text-destructive">{error}</p>

  const SkeletonRow = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-8" />
        <CardAction>
          <Skeleton className="h-8 w-20" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32" />
        <Skeleton className="mt-5 h-10" />
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {filteredStreamers.length} results
        </InputGroupAddon>
      </InputGroup>
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        ) : filteredStreamers.length === 0 ? (
          <p>No creators found</p>
        ) : (
          filteredStreamers.map((streamer) => (
            <Card key={streamer.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{streamer.name}</CardTitle>
                <CardAction>
                  <Badge>{streamer.platform}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>{streamer.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">⭐ {streamer.rating} / 5</Badge>
                <Button onClick={() => navigate(`/streamers/${streamer.id}`)}>
                  View
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
