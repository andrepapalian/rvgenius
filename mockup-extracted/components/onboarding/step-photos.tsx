"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import type { RVFormData } from "@/app/page"
import { ArrowLeft, ArrowRight, Upload, X, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type StepPhotosProps = {
  formData: RVFormData
  updateFormData: (data: Partial<RVFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepPhotos({ formData, updateFormData, onNext, onBack }: StepPhotosProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      )
      if (files.length > 0) {
        addFiles(files)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.photos]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    )
    if (files.length > 0) {
      addFiles(files)
    }
  }

  const addFiles = (files: File[]) => {
    const newPhotos = [...formData.photos, ...files]
    updateFormData({ photos: newPhotos })

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    updateFormData({ photos: newPhotos })
    setPreviews(newPreviews)
  }

  const isValid = formData.photos.length >= 1

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-1 text-sm font-medium text-primary">Step 3 of 5</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Photos</h1>
        <p className="mt-2 text-muted-foreground">
          Upload high-quality photos of your RV. Listings with more photos get more views.
        </p>
      </div>

      <div className="space-y-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            dragActive
              ? "border-primary bg-primary/10"
              : "border-border bg-secondary hover:border-primary/50"
          )}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground">
              Drag and drop your photos here
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or click to browse from your device
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Supports: JPG, PNG, WebP (Max 10MB each)
            </p>
          </div>
        </div>

        {previews.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Uploaded Photos ({previews.length})
              </p>
              <p className="text-xs text-muted-foreground">
                First photo will be your cover image
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary"
                >
                  <img
                    src={preview}
                    alt={`Upload ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      Cover
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {previews.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Photo Tips</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>Take photos in good lighting, preferably outdoors</li>
                  <li>Include exterior shots from multiple angles</li>
                  <li>{"Show the interior: living area, bedroom, kitchen, bathroom"}</li>
                  <li>Highlight any special features or upgrades</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
