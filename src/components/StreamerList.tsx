import { useEffect, useState } from "react"
import { useStreamerStore } from "../store/useStreamerStore"
import {
  Table,
  TableHead,
  TableRow,
  TableCaption,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table"
import { Card, CardContent } from "./ui/card"
import { Button, buttonVariants } from "./ui/button"
import { Eye, Pencil, Search, SearchIcon, Trash } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "./ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"

const StreamerList = () => {
  const navigate = useNavigate()

  const { streamers, fetchStreamers, deleteStreamer, loading, error } =
    useStreamerStore()

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
    <TableRow>
      <TableCell>
        <Skeleton className="h-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8" />
      </TableCell>
    </TableRow>
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <Link
          to="/streamers/add"
          className={buttonVariants({ variant: "default" })}
        >
          + Add Review
        </Link>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search creators or platforms..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
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
      <Card>
        <CardContent>
          <Table>
            <TableCaption>Top Rated Creators</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">Creator</TableHead>
                <TableHead className="w-25">Platform</TableHead>
                <TableHead className="w-25">Rating</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-25">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : filteredStreamers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No creators found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStreamers.map((streamer) => (
                  <TableRow key={streamer.id}>
                    <TableCell>{streamer.name}</TableCell>
                    <TableCell>{streamer.platform}</TableCell>
                    <TableCell>⭐ {streamer.rating} / 5</TableCell>
                    {streamer.description.length <= 42 ? (
                      <TableCell>{streamer.description}</TableCell>
                    ) : (
                      <TableCell>
                        {streamer.description.substring(0, 42) + "..."}
                      </TableCell>
                    )}
                    <TableCell className="flex gap-2">
                      <Button
                        variant={"default"}
                        size={"icon"}
                        onClick={() => navigate(`/streamers/${streamer.id}`)}
                      >
                        <Eye />
                      </Button>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() =>
                          navigate(`/streamers/edit/${streamer.id}`)
                        }
                      >
                        <Pencil />
                      </Button>
                      <Button
                        onClick={() => deleteStreamer(streamer.id!)}
                        variant={"destructive"}
                        size={"icon"}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StreamerList
