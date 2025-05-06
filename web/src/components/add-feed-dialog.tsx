import type React from 'react'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface AddFeedDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAddFeed: () => void
}

export function AddFeedDialog({
    open,
    onOpenChange,
    onAddFeed,
}: AddFeedDialogProps) {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!url) {
            toast({
                title: 'URL requise',
                description: "Veuillez entrer l'URL d'un flux RSS",
                variant: 'destructive',
            })
            return
        }

        setIsLoading(true)

        // Simuler l'ajout d'un flux
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: 'Flux ajouté',
                description: 'Le flux RSS a été ajouté avec succès',
            })
            setUrl('')
            onOpenChange(false)
            onAddFeed()
        }, 1500)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter un flux RSS</DialogTitle>
                        <DialogDescription>
                            Entrez l'URL du flux RSS que vous souhaitez ajouter
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="url">URL du flux RSS</Label>
                            <Input
                                id="url"
                                placeholder="https://example.com/feed.xml"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Ajout en cours...
                                </>
                            ) : (
                                'Ajouter'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
