import { defineCollection, z } from 'astro:content';

const members = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        role: z.enum(['Faculty', 'Ph.D.', 'Masters', 'Undergraduate', 'Alumni', 'Postdoc', 'Visiting Student', 'Visiting Faculty']),
        photoUrl: z.string().optional(),
        joinDate: z.string(),
        email: z.string().optional(),
        website: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        portfolio: z.string().optional(),
        resume: z.string().optional(),
        researchInterests: z.array(z.string()).optional(),
        order: z.number().optional(),
        image: z.string().optional(),
        isAlumni: z.boolean().optional(),
        alumniType: z.string().optional(),
        currentPosition: z.string().optional(),
        graduated: z.string().optional(),
        university: z.string().optional(),
        duration: z.string().optional(),
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
        image: z.string().optional(),
        icon: z.string().optional(),
        order: z.number().optional(),
    }),
});

export const collections = { members, news, research };
