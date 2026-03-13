import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStreamerStore } from "@/store/useStreamerStore"
import { streamerSchema } from "@/utils/streamerSchema"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function EditStreamer() {
  const { id } = useParams() // Grabs the ID from the URL (/edit/123)
  const navigate = useNavigate()
  const { streamers, updateStreamer } = useStreamerStore()

  const [errors, setErrors] = useState<Record<string, string[]>>({})

  // 1. Find the streamer we want to edit from our existing list
  const currentStreamer = streamers.find((s) => s.id === id)
  const [platform, setPlatform] = useState<string>(
    currentStreamer?.platform || ""
  )

  // 2. If the user refreshes the page and 'streamers' is empty,
  // an exam-pro would usually fetch them again or redirect.
  useEffect(() => {
    if (!currentStreamer) {
      navigate("/streamers")
    } else {
      setPlatform(currentStreamer.platform)
    }
  }, [currentStreamer, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const rawData = {
      name: formData.get("name") as string,
      platform: platform,
      rating: Number(formData.get("rating")),
      description: formData.get("description") as string,
    }

    const result = streamerSchema.safeParse(rawData)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Record<string, string[]>)
      return
    }

    if (id) {
      await updateStreamer(id, result.data)
      navigate("/streamers")
    }
  }

  if (!currentStreamer) return null

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Edit {currentStreamer.name}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Creator Name</Label>
            <Input id="name" name="name" defaultValue={currentStreamer.name} />
            {/* Display Error here */}
            {errors.name && (
              <p className="text-xs font-medium text-destructive">
                {errors.name[0]}
              </p>
            )}
          </div>

          {/* Platform Field */}
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select onValueChange={setPlatform} value={platform}>
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Twitch">Twitch</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="Kick">Kick</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rating Field */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              defaultValue={currentStreamer.rating}
            />
            {errors.rating && (
              <p className="text-xs font-medium text-destructive">
                {errors.rating[0]}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Short Review</Label>
            <Input
              id="description"
              name="description"
              defaultValue={currentStreamer.description}
            />
            {errors.description && (
              <p className="text-xs font-medium text-destructive">
                {errors.description[0]}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/streamers")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
