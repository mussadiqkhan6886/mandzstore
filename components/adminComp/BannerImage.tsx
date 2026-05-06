"use client"
import Image from "next/image"
import imageCompression from "browser-image-compression"
import { useState, useRef } from "react"

export default function BannerUpload() {
  const [preview, setPreview] = useState("")
  const [status, setStatus] = useState<"idle"|"compressing"|"uploading"|"done"|"error">("idle")
  const [origSize, setOrigSize] = useState("")
  const [compSize, setCompSize] = useState("")
  const [saving, setSaving] = useState(0)
  const [isDrag, setIsDrag] = useState(false)
  const [fileName, setFileName] = useState("")
  const compressedRef = useRef<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fmt = (b: number) =>
    b < 1048576 ? Math.round(b / 1024) + "KB" : (b / 1048576).toFixed(1) + "MB"

  const handle = async (file: File) => {
    compressedRef.current = null
    setPreview(URL.createObjectURL(file))
    setOrigSize(fmt(file.size))
    setFileName(file.name.length > 24 ? file.name.slice(0, 22) + "…" : file.name)
    setCompSize("")
    setStatus("compressing")

    try {
      const result = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      })
      compressedRef.current = result
      setCompSize(fmt(result.size))
      setSaving(Math.round((1 - result.size / file.size) * 100))
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  const doUpload = async () => {
    if (!compressedRef.current) return
    setStatus("uploading")
    const fd = new FormData()
    fd.append("image", compressedRef.current, compressedRef.current.name)
    try {
      const res = await fetch("/api/bannerImage", { method: "POST", body: fd })
      const data = await res.json()
      setStatus(data.success ? "done" : "error")
      clear()
    } catch {
      setStatus("error")
    }
  }

  const clear = () => {
    setPreview(""); setStatus("idle"); setOrigSize(""); setCompSize(""); setFileName("")
    compressedRef.current = null
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="w-full space-y-3 mb-4">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setIsDrag(true) }}
        onDragLeave={() => setIsDrag(false)}
        onDrop={e => { e.preventDefault(); setIsDrag(false); if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]) }}
        className={`relative w-full aspect-[16/7] rounded-xl border-[1.5px] border-dashed overflow-hidden cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors
          ${isDrag ? "border-blue-400 bg-blue-50" : "border-zinc-300 bg-zinc-50 hover:border-zinc-400 hover:bg-zinc-100"}`}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { if (e.target.files?.[0]) handle(e.target.files[0]) }} />

        {preview && (
          <>
            <Image src={preview} alt="Banner preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <span className="text-white text-sm font-medium">Change image</span>
            </div>
          </>
        )}

        {!preview && (
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="w-12 h-12 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-700">Drop banner image here</p>
            <p className="text-xs text-zinc-400">or click to browse · PNG, JPG, WEBP</p>
          </div>
        )}
      </div>

      {/* Meta row */}
      {preview && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">{fileName}</span>
            {origSize && <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">{origSize}</span>}
            {origSize && compSize && <span className="text-zinc-400">→</span>}
            {compSize && (
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                {compSize}{saving > 5 ? ` · −${saving}%` : ""}
              </span>
            )}
            {status === "compressing" && <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">compressing…</span>}
          </div>
          <button onClick={clear} className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">✕ Remove</button>
        </div>
      )}

      {/* Upload button */}
      {compSize && status !== "done" && (
        <button
          onClick={doUpload}
          disabled={status === "uploading"}
          className="w-full py-2.5 rounded-lg border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] transition disabled:opacity-50"
        >
          {status === "uploading" ? "Uploading…" : "Upload banner"}
        </button>
      )}

      {status === "done" && <p className="text-sm text-green-600">✓ Uploaded successfully</p>}
      {status === "error" && <p className="text-sm text-red-500">Something went wrong. Try again.</p>}
    </div>
  )
}