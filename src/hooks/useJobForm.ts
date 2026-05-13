import { useState } from "react"

export function useJobForm(initialData: any = {}) {

  const [form, setForm] = useState<any>(initialData)
  const [loading, setLoading] = useState(false)

  function handleChange(e: any) {
    const { name, value } = e.target
    setForm((prev: any) => ({ ...prev, [name]: value }))
  }

  return {
    form,
    setForm,
    handleChange,
    loading,
    setLoading,
  }
}
