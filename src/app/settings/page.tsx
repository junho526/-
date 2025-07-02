'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/hooks/use-settings";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
    const { settings, setSetting } = useSettings();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary">Settings</CardTitle>
                    <CardDescription>Customize your arena experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="animation-speed">Animation Speed</Label>
                         <Select
                            value={settings.animationSpeed.toString()}
                            onValueChange={(value) => setSetting('animationSpeed', parseInt(value, 10))}
                        >
                            <SelectTrigger id="animation-speed">
                                <SelectValue placeholder="Select animation speed" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="150">Fast</SelectItem>
                                <SelectItem value="300">Medium</SelectItem>
                                <SelectItem value="500">Slow</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">Adjust the speed of piece movements.</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                         <Label htmlFor="board-theme">Board Theme (Coming Soon)</Label>
                         <Select disabled>
                            <SelectTrigger id="board-theme">
                                <SelectValue placeholder="Indigo/Lavender" />
                            </SelectTrigger>
                         </Select>
                         <p className="text-sm text-muted-foreground">More visual themes will be available soon.</p>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">
                           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Game
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
