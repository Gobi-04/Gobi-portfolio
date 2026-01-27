import { create } from 'zustand';

type Section = 'hero' | 'about' | 'skills' | 'projects' | 'education' | 'experience' | 'testimonials' | 'contact';

interface SceneState {
    currentSection: Section;
    setSection: (section: Section) => void;
    isDoorOpen: boolean;
    setDoorOpen: (open: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
    currentSection: 'hero',
    setSection: (section) => set({ currentSection: section }),
    isDoorOpen: false,
    setDoorOpen: (open) => set({ isDoorOpen: open }),
}));
