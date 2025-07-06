"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { BarChart3, Plus, X, Clock } from "lucide-react"

export default function CreatePoll() {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [duration, setDuration] = useState("24")
  const [allowMultiple, setAllowMultiple] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setQuestion("")
    setOptions(["", ""])
    setDuration("24")
    setAllowMultiple(false)
    setIsLoading(false)

    alert("Poll created successfully!")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span>Create Poll</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Poll Question */}
        <div>
          <label className="text-sm font-medium mb-2 block">Poll Question</label>
          <Textarea
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
          />
        </div>

        {/* Poll Options */}
        <div>
          <label className="text-sm font-medium mb-2 block">Options</label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                </div>
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            {options.length < 6 && (
              <button
                onClick={addOption}
                className="flex items-center space-x-2 w-full p-3 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-muted-foreground/50 transition-colors"
              >
                <Plus className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Add option</span>
              </button>
            )}
          </div>
        </div>

        {/* Poll Settings */}
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium">Poll Settings</h4>

          {/* Duration */}
          <div className="flex items-center space-x-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Duration:</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="px-3 py-1 bg-background border border-border rounded-lg text-sm"
            >
              <option value="1">1 hour</option>
              <option value="6">6 hours</option>
              <option value="12">12 hours</option>
              <option value="24">1 day</option>
              <option value="168">1 week</option>
            </select>
          </div>

          {/* Multiple Choice */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="multiple"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="multiple" className="text-sm">
              Allow multiple selections
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-medium mb-3">Preview</h4>
          <div className="space-y-3">
            <p className="font-medium">{question || "Your poll question will appear here"}</p>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                  <div className="w-4 h-4 border-2 border-muted-foreground rounded-full"></div>
                  <span className="text-sm">{option || `Option ${index + 1}`}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Poll ends in {duration} {duration === "1" ? "hour" : duration === "168" ? "week" : "hours"}
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!question.trim() || options.some((opt) => !opt.trim()) || isLoading}
          className="w-full"
        >
          {isLoading ? "Creating Poll..." : "Create Poll"}
        </Button>
      </CardContent>
    </Card>
  )
}
