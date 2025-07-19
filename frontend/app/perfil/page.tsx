"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { useApp } from "@/lib/store"
import { ArrowLeft, Edit, Save, X } from "lucide-react"
import type { User } from "@/lib/types"

export default function PerfilPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    if (!state.user) {
      router.push("/login")
    } else {
      setFormData({
        name: state.user.name,
        document: state.user.document,
        email: state.user.email,
        phone: state.user.phone,
        address: state.user.address,
      })
    }
  }, [state.user, router])

  if (!state.user) {
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const updatedUser: User = {
      ...state.user,
      name: formData.name,
      document: formData.document,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    }

    dispatch({ type: "SET_USER", payload: updatedUser })
    setIsEditing(false)

    // Simular salvamento no localStorage para persistência
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const handleCancel = () => {
    setFormData({
      name: state.user.name,
      document: state.user.document,
      email: state.user.email,
      phone: state.user.phone,
      address: state.user.address,
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Loja
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Informações Pessoais</CardTitle>
                  <CardDescription>
                    {state.user.type === "fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{state.user.type === "fisica" ? "Nome Completo" : "Nome da Empresa"}</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md border">{state.user.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">{state.user.type === "fisica" ? "CPF" : "CNPJ"}</Label>
                  {isEditing ? (
                    <Input
                      id="document"
                      type="text"
                      value={formData.document}
                      onChange={(e) => handleInputChange("document", e.target.value)}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md border">{state.user.document}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md border">{state.user.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md border">{state.user.phone}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md border">{state.user.address}</div>
                )}
              </div>

              {!isEditing && (
                <div className="pt-6 border-t">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Informações da Conta</h3>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p>
                        <strong>Tipo de conta:</strong>{" "}
                        {state.user.type === "fisica" ? "Pessoa Física" : "Pessoa Jurídica"}
                      </p>
                      <p>
                        <strong>ID do usuário:</strong> {state.user.id}
                      </p>
                      <p>
                        <strong>Status:</strong> <span className="text-green-600 font-medium">Ativo</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie a segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Alterar Senha
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  Excluir Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
