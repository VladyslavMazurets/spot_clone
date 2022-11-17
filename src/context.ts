import React from "react";

interface IContext {
    token: string,
    setToken: (val: string) => void,
    newReleases: any[],
    setNewReleases: (val: any) => void,
    featuredPlaylists: any[],
    setFeaturedPlaylists: (val: any) => void,
    categories: any[],
    setCategories: (val: any) => void,
    recommendations: any[],
    setRecommendations: (val: any) => void,
}

export const Context = React.createContext<IContext>({
    token: '',
    setToken() { }, newReleases: [], setNewReleases() { },
    featuredPlaylists: [], setFeaturedPlaylists() { },
    categories: [], setCategories() { },
    recommendations: [], setRecommendations() { }
})