import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the services collection
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    featured: z.boolean().default(false),
    category: z.enum(['domestic', 'commercial', 'heritage', 'specialist']),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    serviceAreas: z.array(z.string()).default([]),
    certifications: z.array(z.string()).optional(),
    testimonials: z.array(z.object({
      name: z.string(),
      location: z.string(),
      rating: z.number().min(1).max(5),
      text: z.string()
    })).optional()
  })
});

// Define the locations collection
const locations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/locations' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    region: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    services: z.array(z.string()).default([]),
    areas: z.array(z.string()).default([]),
    phone: z.string(),
    testimonials: z.string()
  })
});

// Define the projects collection
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    client: z.string().optional(),
    location: z.string(),
    service: z.string(),
    completionDate: z.date(),
    featured: z.boolean().default(false),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional()
    })),
    testimonial: z.object({
      text: z.string(),
      author: z.string(),
      rating: z.number().min(1).max(5)
    }).optional(),
    tags: z.array(z.string()).default([])
  })
});

// Define the testimonials collection
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    location: z.string(),
    service: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    verified: z.boolean().default(false),
    date: z.date(),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  services,
  locations,
  projects,
  testimonials
}; 