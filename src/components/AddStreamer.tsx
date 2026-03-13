import { useStreamerStore } from "@/store/useStreamerStore"
import { streamerSchema } from "@/utils/streamerSchema"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export default function AddStreamer() {
  const navigate = useNavigate()
  const addStreamer = useStreamerStore((state) => state.addStreamer)

  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const rawData = {
      name: formData.get("name") as string,
      platform: formData.get("platform") as string,
      rating: Number(formData.get("rating")),
      description: formData.get("description") as string,
    }

    const result = streamerSchema.safeParse(rawData)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Record<string, string[]>)
      return
    }

    setErrors({})
    await addStreamer(result.data)
    navigate("/streamers/")
  }
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Rate a Creator</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="name">Creator Name</Label>
            <Input id="name" name="name" placeholder="e.g. Shroud" />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select name="platform">
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
            {errors.platform && (
              <p className="text-xs text-destructive">{errors.platform[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" name="rating" type="number" min="1" max="5" />
            {errors.rating && (
              <p className="text-xs text-destructive">{errors.rating[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Review</Label>
            <Input
              id="description"
              name="description"
              placeholder="What makes them great?"
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description[0]}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
