 "use client"
 
 import React, { useState } from "react"
 import { Button } from "@/components/ui/button"
 import { Input } from "@/components/ui/input"
 import { Textarea } from "@/components/ui/textarea"
 import { Switch } from "@/components/ui/switch"
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
 import {
   FieldGroup,
   Field,
   FieldLabel,
   FieldSet,
   FieldLegend,
 } from "@/components/ui/field"
 import { Badge } from "@/components/ui/badge"
 import { Spinner } from "@/components/ui/spinner"
 import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Caravan,
  Check,
  DollarSign,
  Fuel,
  Gauge,
  Home,
  Image as ImageIcon,
  MapPin,
  Ruler,
  Sparkles,
  TrendingUp,
  Truck,
  Upload,
  Users,
  Phone,
  Mail,
  AlertCircle,
  X,
 } from "lucide-react"
 import { cn } from "@/lib/utils"
 import Link from "next/link"
 
 const currentYear = new Date().getFullYear()
 const yearOptions = Array.from({ length: 40 }, (_, i) => (currentYear - i).toString())
 
const rvTypeCards = [
  { id: "class-a", name: "Class A" },
  { id: "class-b", name: "Class B" },
  { id: "class-c", name: "Class C" },
  { id: "travel-trailer", name: "Travel Trailer" },
  { id: "fifth-wheel", name: "Fifth Wheel" },
]
 
 const conditions = [
   { value: "new", label: "New" },
   { value: "excellent", label: "Excellent" },
   { value: "good", label: "Good" },
   { value: "fair", label: "Fair" },
   { value: "needs-work", label: "Needs Work" },
 ]
 
 const fuelTypes = [
   { value: "gasoline", label: "Gasoline" },
   { value: "diesel", label: "Diesel" },
   { value: "electric", label: "Electric" },
   { value: "hybrid", label: "Hybrid" },
   { value: "na", label: "N/A (Towable)" },
 ]
 
 const featureOptions = [
   { id: "generator", label: "Generator" },
   { id: "solar-panels", label: "Solar Panels" },
   { id: "backup-camera", label: "Backup Camera" },
  { id: "leveling-system", label: "Auto Leveling" },
  { id: "power-jacks", label: "Power Jacks" },
  { id: "power-tongue-jack", label: "Power Tongue Jack" },
   { id: "washer-dryer", label: "Washer/Dryer" },
   { id: "outdoor-kitchen", label: "Outdoor Kitchen" },
   { id: "fireplace", label: "Fireplace" },
   { id: "satellite-tv", label: "Satellite TV" },
   { id: "wifi-booster", label: "WiFi Booster" },
   { id: "king-bed", label: "King Bed" },
 ]
 
 type ListingFormState = {
   rvType: string
   make: string
   model: string
   year: string
   length: string
   sleeps: string
   slideouts: string
   fuelType: string
   mileage: string
   condition: string
   features: string[]
   description: string
   photos: string[]
   price: string
   negotiable: boolean
   sellerName: string
   email: string
   phone: string
   location: string
 }
 
 const initialState: ListingFormState = {
   rvType: "",
   make: "",
   model: "",
   year: "",
   length: "",
   sleeps: "",
   slideouts: "",
   fuelType: "",
   mileage: "",
   condition: "",
   features: [],
   description: "",
   photos: [],
   price: "",
   negotiable: false,
   sellerName: "",
   email: "",
   phone: "",
   location: "",
 }
 
 const rvTypeLabels: Record<string, string> = {
   "class-a": "Class A Motorhome",
   "class-b": "Class B Camper Van",
   "class-c": "Class C Motorhome",
   "travel-trailer": "Travel Trailer",
   "fifth-wheel": "Fifth Wheel",
 }
 
 const conditionLabels: Record<string, string> = {
   new: "New",
   excellent: "Excellent",
   good: "Good",
   fair: "Fair",
   "needs-work": "Needs Work",
 }
 
 const fuelLabels: Record<string, string> = {
   gasoline: "Gasoline",
   diesel: "Diesel",
   electric: "Electric",
   hybrid: "Hybrid",
   na: "N/A",
 }
 
 const featureLabels: Record<string, string> = Object.fromEntries(
   featureOptions.map((f) => [f.id, f.label])
 )
 
 export function CreateListingForm({ variant = "default" }: { variant?: "default" | "dashboard" }) {
   const [step, setStep] = useState(1)
   const [form, setForm] = useState<ListingFormState>(initialState)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isPublished, setIsPublished] = useState(false)
 
   const updateForm = (patch: Partial<ListingFormState>) => {
     setForm((prev) => ({ ...prev, ...patch }))
   }
 
   const toggleFeature = (id: string) => {
     setForm((prev) => ({
       ...prev,
       features: prev.features.includes(id)
         ? prev.features.filter((f) => f !== id)
         : [...prev.features, id],
     }))
   }
 
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     if (step < 4) {
       nextStep()
       return
     }
 
     setIsSubmitting(true)
     // Here you can POST to your backend or trigger your specs API, etc.
     await new Promise((resolve) => setTimeout(resolve, 1500))
     setIsSubmitting(false)
     setIsPublished(true)
   }
 
   if (isPublished) {
     return (
       <div className="py-10 text-center">
         <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
           <Check className="h-10 w-10 text-primary-foreground" />
         </div>
         <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
           Listing Published!
         </h2>
         <p className="mx-auto mt-2 max-w-md text-muted-foreground">
           Your RV has been listed on RVGenius. We&apos;ll notify you when buyers reach out.
         </p>
         <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
           <Button
             variant="outline"
             className="bg-transparent"
             onClick={() => {
               setForm(initialState)
               setIsPublished(false)
               setStep(1)
             }}
           >
             List Another RV
           </Button>
           {variant === "dashboard" ? (
             <>
               <Button asChild>
                 <Link href="/dashboard/listings">My Listings</Link>
               </Button>
               <Button variant="secondary" asChild>
                 <Link href="/dashboard">Dashboard</Link>
               </Button>
             </>
           ) : (
             <Button asChild>
               <Link href="/">Browse Listings</Link>
             </Button>
           )}
         </div>
       </div>
     )
   }
 
  const totalSteps = 5
  const progressPercent = (step / totalSteps) * 100

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Progress bar – replaces dot-based stepper */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
          <span>
            {step === 1 && "Basic info"}
            {step === 2 && "Vehicle specs"}
            {step === 3 && "Features & description"}
            {step === 4 && "Photos"}
            {step === 5 && "Pricing & contact"}
          </span>
          <span className="tabular-nums">
            Step {step} of {totalSteps}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted">
          <div
            className="h-1.5 rounded-full bg-primary transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

       <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
         {step === 1 && (
            <div className="space-y-8">
           <div className="space-y-6">
              <div>
                 <FieldLabel className="mb-3 block text-sm font-medium text-foreground">
                   Select RV type
                 </FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                   {rvTypeCards.map((card) => {
                     const isSelected = form.rvType === card.id
                     return (
                       <button
                         key={card.id}
                         type="button"
                         onClick={() => updateForm({ rvType: card.id })}
                         className={cn(
                           "flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-xs transition-all sm:text-sm",
                           isSelected
                             ? "border-primary bg-primary/10"
                             : "border-border bg-card hover:border-primary/50"
                         )}
                         >
                         <span
                           className={cn(
                             "font-medium text-xs sm:text-sm",
                             isSelected ? "text-foreground" : "text-muted-foreground"
                           )}
                         >
                           {card.name}
                         </span>
                       </button>
                     )
                   })}
                 </div>
               </div>
 
               <div className="grid gap-4 sm:grid-cols-3">
                 <Field>
                   <FieldLabel>Make</FieldLabel>
                   <Input
                     placeholder="e.g., Winnebago"
                     value={form.make}
                     onChange={(e) => updateForm({ make: e.target.value })}
                     className="border-border bg-secondary"
                   />
                 </Field>
                 <Field>
                   <FieldLabel>Model</FieldLabel>
                   <Input
                     placeholder="e.g., View 24D"
                     value={form.model}
                     onChange={(e) => updateForm({ model: e.target.value })}
                     className="border-border bg-secondary"
                   />
                 </Field>
                 <Field>
                   <FieldLabel>Year</FieldLabel>
                   <Select
                     value={form.year}
                     onValueChange={(value) => updateForm({ year: value })}
                   >
                     <SelectTrigger className="border-border bg-secondary">
                       <SelectValue placeholder="Select year" />
                     </SelectTrigger>
                     <SelectContent>
                       {yearOptions.map((y) => (
                         <SelectItem key={y} value={y}>
                           {y}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </Field>
               </div>
             </div>
 
             <div className="flex justify-end border-t border-border pt-4">
               <Button
                 type="button"
                 className="gap-2"
                 onClick={nextStep}
                 disabled={!form.rvType || !form.make || !form.model || !form.year}
               >
                 Continue
                 <ArrowRight className="h-4 w-4" />
               </Button>
             </div>
           </div>
         )}
 
        {/* Step 2: Vehicle details (length, sleeps, condition) */}
         {step === 2 && (
           <div className="space-y-8">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                 <Field>
                   <FieldLabel>Length (ft)</FieldLabel>
                   <Input
                     type="number"
                     placeholder="e.g., 25"
                     value={form.length}
                     onChange={(e) => updateForm({ length: e.target.value })}
                     className="border-border bg-secondary"
                   />
                 </Field>
                 <Field>
                   <FieldLabel>Sleeps</FieldLabel>
                   <Select
                     value={form.sleeps}
                     onValueChange={(value) => updateForm({ sleeps: value })}
                   >
                     <SelectTrigger className="border-border bg-secondary">
                       <SelectValue placeholder="Select" />
                     </SelectTrigger>
                     <SelectContent>
                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                         <SelectItem key={n} value={n.toString()}>
                           {n} {n === 1 ? "person" : "people"}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </Field>
                 <Field>
                   <FieldLabel>Slideouts</FieldLabel>
                   <Select
                     value={form.slideouts}
                     onValueChange={(value) => updateForm({ slideouts: value })}
                   >
                     <SelectTrigger className="border-border bg-secondary">
                       <SelectValue placeholder="Select" />
                     </SelectTrigger>
                     <SelectContent>
                       {[0, 1, 2, 3, 4, 5].map((n) => (
                         <SelectItem key={n} value={n.toString()}>
                           {n}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </Field>
               </div>
 
              <div className="grid gap-4 sm:grid-cols-3">
                <Field>
                  <FieldLabel>Fuel type</FieldLabel>
                  <Select
                    value={form.fuelType}
                    onValueChange={(value) => updateForm({ fuelType: value })}
                  >
                    <SelectTrigger className="border-border bg-secondary">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Mileage</FieldLabel>
                  <Input
                    type="number"
                    placeholder="e.g., 45,000"
                    value={form.mileage}
                    onChange={(e) => updateForm({ mileage: e.target.value })}
                    className="border-border bg-secondary"
                  />
                </Field>
                <Field>
                  <FieldLabel>Condition</FieldLabel>
                  <Select
                    value={form.condition}
                    onValueChange={(value) => updateForm({ condition: value })}
                  >
                    <SelectTrigger className="border-border bg-secondary">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
             </div>
 
             <div className="flex justify-between border-t border-border pt-4">
               <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                 <ArrowLeft className="h-4 w-4" />
                 Back
               </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!form.length || !form.sleeps || !form.condition}
                  className="gap-2"
                >
                 Continue
                 <ArrowRight className="h-4 w-4" />
               </Button>
             </div>
           </div>
         )}
 
        {/* Step 3: Features & description */}
         {step === 3 && (
          <div className="space-y-8">
            <div className="space-y-6">
              <FieldSet>
                <FieldLegend>Features & amenities</FieldLegend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {featureOptions.map((feature) => (
                    <label
                      key={feature.id}
                      htmlFor={feature.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-sm hover:bg-muted"
                    >
                      <input
                        id={feature.id}
                        type="checkbox"
                        checked={form.features.includes(feature.id)}
                        onChange={() => toggleFeature(feature.id)}
                        className="h-5 w-5 rounded border-border text-primary accent-primary"
                      />
                      <span className="text-foreground">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </FieldSet>

              <FieldGroup>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    placeholder="Describe your RV in detail. Include any upgrades, maintenance history, and what makes it special..."
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    className="min-h-[150px] resize-none border-border bg-secondary"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    A detailed description builds buyer confidence and leads.
                  </p>
                </Field>
              </FieldGroup>
            </div>

            <div className="flex justify-between border-t border-border pt-4">
              <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!form.description}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Photos – drag & drop uploader from mockup, simplified to data URLs */}
        {step === 4 && (
           <PhotosStep
             form={form}
             updateForm={updateForm}
             onBack={prevStep}
             onNext={nextStep}
           />
         )}
 
        {/* Step 5: Pricing & contact */}
        {step === 5 && (
           <div className="space-y-8">
            <div className="space-y-6">
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Set your price</h3>
                      <p className="text-xs text-muted-foreground">
                        Research similar RVs to price competitively.
                      </p>
                    </div>
                  </div>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Asking price (USD)</FieldLabel>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="text"
                          placeholder="0"
                          value={form.price ? Number(form.price).toLocaleString() : ""}
                          onChange={(e) =>
                            updateForm({
                              price: e.target.value.replace(/[^0-9]/g, ""),
                            })
                          }
                          className="h-12 border-border bg-secondary pl-7 text-lg font-semibold"
                        />
                      </div>
                    </Field>
                  </FieldGroup>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Price negotiable</p>
                        <p className="text-xs text-muted-foreground">
                          Let buyers know you&apos;re open to offers.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={form.negotiable}
                      onCheckedChange={(checked) => updateForm({ negotiable: checked })}
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Seller information</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Your name</FieldLabel>
                        <Input
                          placeholder="John Smith"
                          value={form.sellerName}
                          onChange={(e) => updateForm({ sellerName: e.target.value })}
                          className="border-border bg-secondary"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Email address</FieldLabel>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => updateForm({ email: e.target.value })}
                          className="border-border bg-secondary"
                        />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Phone number</FieldLabel>
                        <Input
                          type="tel"
                          placeholder="(555) 123‑4567"
                          value={form.phone}
                          onChange={(e) => updateForm({ phone: e.target.value })}
                          className="border-border bg-secondary"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Location</FieldLabel>
                        <Input
                          placeholder="City, State"
                          value={form.location}
                          onChange={(e) => updateForm({ location: e.target.value })}
                          className="border-border bg-secondary"
                        />
                      </Field>
                    </div>
                  </div>
                </section>

                <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-xs">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Privacy notice</p>
                    <p className="mt-1 text-muted-foreground">
                      Your contact information is only shared with buyers who express interest
                      in your listing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={
                  !form.price ||
                  !form.sellerName ||
                  !form.email ||
                  !form.phone ||
                  !form.location ||
                  isSubmitting
                }
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Publish listing
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
       </form>
 
     </div>
   )
 }
 
 type PhotosStepProps = {
   form: ListingFormState
   updateForm: (patch: Partial<ListingFormState>) => void
   onBack: () => void
   onNext: () => void
 }
 
 function PhotosStep({ form, updateForm, onBack, onNext }: PhotosStepProps) {
   const [dragActive, setDragActive] = useState(false)
 
   const handleDrag = (e: React.DragEvent) => {
     e.preventDefault()
     e.stopPropagation()
     if (e.type === "dragenter" || e.type === "dragover") {
       setDragActive(true)
     } else if (e.type === "dragleave") {
       setDragActive(false)
     }
   }
 
   const handleDrop = (e: React.DragEvent) => {
     e.preventDefault()
     e.stopPropagation()
     setDragActive(false)
     const files = Array.from(e.dataTransfer.files).filter((file) =>
       file.type.startsWith("image/")
     )
     if (files.length) {
       addFiles(files)
     }
   }
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = Array.from(e.target.files || []).filter((file) =>
       file.type.startsWith("image/")
     )
     if (files.length) {
       addFiles(files)
     }
   }
 
   const addFiles = (files: File[]) => {
     files.forEach((file) => {
       const reader = new FileReader()
       reader.onload = (event) => {
         const src = event.target?.result as string
         if (src) {
           updateForm({ photos: [...form.photos, src] })
         }
       }
       reader.readAsDataURL(file)
     })
   }
 
   const removePhoto = (index: number) => {
     updateForm({
       photos: form.photos.filter((_, i) => i !== index),
     })
   }
 
   const hasPhotos = form.photos.length > 0
 
   return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div
           onDragEnter={handleDrag}
           onDragLeave={handleDrag}
           onDragOver={handleDrag}
           onDrop={handleDrop}
           className={cn(
             "relative flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
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
           <div className="flex flex-col items-center">
             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
               <Upload className="h-5 w-5 text-primary" />
             </div>
             <p className="text-sm font-medium text-foreground">
               Drag and drop photos here
             </p>
             <p className="mt-1 text-xs text-muted-foreground">
               or click to browse from your device
             </p>
             <p className="mt-3 text-[0.7rem] text-muted-foreground">
               Supports JPG, PNG, WebP (max 10MB each)
             </p>
           </div>
         </div>
 
         {hasPhotos ? (
           <div>
             <div className="mb-3 flex items-center justify-between text-xs">
               <p className="font-medium text-foreground">
                 Uploaded photos ({form.photos.length})
               </p>
               <p className="text-muted-foreground">
                 First photo will be used as your cover image.
               </p>
             </div>
             <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
               {form.photos.map((src, index) => (
                 <div
                   key={index}
                   className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary"
                 >
                   <img src={src} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
                   {index === 0 && (
                     <div className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[0.65rem] font-medium text-primary-foreground">
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
         ) : (
           <div className="rounded-lg border border-border bg-card p-4 text-xs">
             <div className="flex items-start gap-3">
               <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                 <ImageIcon className="h-4 w-4 text-primary" />
               </div>
               <div>
                 <p className="font-medium text-foreground">Photo tips</p>
                 <ul className="mt-1 space-y-1 text-muted-foreground">
                   <li>Use good natural lighting where possible.</li>
                   <li>Include clear exterior and interior shots.</li>
                   <li>Highlight standout features or recent upgrades.</li>
                 </ul>
               </div>
             </div>
           </div>
         )}
       </div>
 
       <div className="mt-4 flex justify-between border-t border-border pt-4">
         <Button type="button" variant="outline" onClick={onBack} className="gap-2">
           <ArrowLeft className="h-4 w-4" />
           Back
         </Button>
         <Button type="button" onClick={onNext} disabled={!hasPhotos} className="gap-2">
           Continue
           <ArrowRight className="h-4 w-4" />
         </Button>
       </div>
     </div>
   )
 }
