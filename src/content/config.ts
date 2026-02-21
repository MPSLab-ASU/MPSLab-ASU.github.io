import { defineCollection, z } from 'astro:content';

const members = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        role: z.enum(['Faculty', 'Ph.D.', 'Masters', 'Undergraduate', 'Alumni', 'Postdoc']),
        photoUrl: z.string().optional(),
        joinDate: z.string(),
        email: z.string().optional(),
        website: z.string().optional(),
        researchInterests: z.array(z.string()).optional(),
        order: z.number().optional(),
    }),
});

const news = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        type: z.enum(['Award', 'Publication', 'Event', 'Announcement', 'General']),
        excerpt: z.string().optional(),
    }),
});

const research = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        status: z.enum(['Active', 'Extended']),
        description: z.string(),
        icon: z.string().optional(),
        order: z.number().optional(),
    }),
});

export const collections = { members, news, research };
