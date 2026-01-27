"use client";

import { useEffect } from 'react';
import { useSceneStore } from '@/lib/useSceneStore';

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'education', 'experience', 'testimonials', 'contact'];

export default function SectionTracker() {
    const { setSection, setDoorOpen } = useSceneStore();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (id && SECTIONS.includes(id as any)) {
                            setSection(id as any);

                            // Handle door state
                            if (id === 'about' || id === 'projects' || id === 'skills' || id === 'education') {
                                setDoorOpen(true);
                            } else {
                                setDoorOpen(false);
                            }
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        // Observe all sections
        const sectionElements = document.querySelectorAll('section');
        sectionElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [setSection, setDoorOpen]);

    return null;
}
