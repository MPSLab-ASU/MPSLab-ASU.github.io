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
        date: z.union([z.string(), z.date(), z.number()]),
        type: z.enum(['Award', 'Publication', 'Event', 'Announcement', 'General']),
        description: z.string(),
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

const resources = defineCollection({
    type: 'content',
    schema: z.object({
        researchArea: z.string(),
        resources: z.array(z.object({
            title: z.string(),
            type: z.enum(['Paper', 'Book', 'Video', 'Tutorial', 'Tool', 'Publication']),
            url: z.string().optional(),
            authors: z.string().optional(),
            description: z.string().optional(),
        })),
    }),
});

export const collections = { members, news, research, resources };
