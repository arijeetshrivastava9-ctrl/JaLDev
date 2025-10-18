
import React from 'react';
import { WasteCategory } from './types';
import type { CategoryInfo } from './types';

export const OrganicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16.486 3.514C15.223 2.25 13.433 1.5 11.5 1.5c-1.654 0-3.19.558-4.486 1.635-2.91 2.417-3.723 6.643-2.023 9.865 1.7 3.223 4.887 5.176 8.009 5.486v-3.411c-2.148-.276-3.86-1.688-4.99-3.957-.962-1.933-.56-4.523.95-6.033 1.155-1.155 2.68-1.6 4.214-1.6s3.059.445 4.214 1.6c1.51 1.51 1.912 4.1.95 6.033-1.13 2.269-2.842 3.681-4.99 3.957v3.411c3.122-.31 6.309-2.263 8.009-5.486 1.7-3.222.887-7.448-2.023-9.865z" /></svg>
);

export const MetalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-3.32 0-6.13 2.23-6.85 5.25-.97.23-1.83.79-2.45 1.58-.92 1.18-.99 2.87-.2 4.14l4.5 7.03-3 -.01c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1l-3 .01 4.5-7.03c.78-1.27.72-2.96-.2-4.14-.62-.79-1.48-1.35-2.45-1.58C18.13 4.23 15.32 2 12 2zm0 2c1.8 0 3.39 1.05 4.14 2.59-.28.05-.56.13-.84.25-1.22.51-2.29 1.39-3.03 2.45-.75-1.06-1.81-1.94-3.03-2.45-.28-.12-.56-.2-.84-.25C8.61 5.05 10.2 4 12 4zm-4.75 5.5c.31-.41.67-.78 1.08-1.08.84-.61 1.83-1.04 2.92-1.23.53.94.85 2.05.85 3.22 0 1.2-.34 2.33-.92 3.32l-3.5 5.47-1.18-1.84c-.58-.9-1.39-3.03-.25-4.86z" /></svg>
);

export const PlasticIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2h8V5zm-2-2h-4v2h4V3zm4 11.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5V9h2v8.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V9h2v8.5zM6 9h4v11H8V11H6V9z" /></svg>
);

export const DryIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M14.25 2.27c.41-.42.41-1.1 0-1.52-.42-.41-1.1-.41-1.52 0l-10 10.25c-.41.42-.41 1.1 0 1.52.42.41 1.1.41 1.52 0L14.25 2.27zm6.22 6.22c.41-.42.41-1.1 0-1.52s-1.1-.41-1.52 0L8.25 17.7c-.41.42-.41 1.1 0 1.52.42.41 1.1.41 1.52 0l10.7-10.71zM4.41 21.59c.59.58 1.54.58 2.12 0l13.17-13.17c.39-.39.39-1.02 0-1.41a.996.996 0 00-1.41 0L5.12 20.17a.996.996 0 000 1.41c.19.2.44.3.7.3.26 0 .51-.1.7-.29z" /></svg>
);


export const WASTE_CATEGORIES_INFO: Record<WasteCategory, CategoryInfo> = {
  [WasteCategory.WET]: {
    name: WasteCategory.WET,
    color: 'bg-green-600',
    icon: <OrganicIcon className="h-8 w-8 text-white" />,
  },
  [WasteCategory.METALLIC]: {
    name: WasteCategory.METALLIC,
    color: 'bg-blue-600',
    icon: <MetalIcon className="h-8 w-8 text-white" />,
  },
  [WasteCategory.PLASTIC]: {
    name: WasteCategory.PLASTIC,
    color: 'bg-yellow-600',
    icon: <PlasticIcon className="h-8 w-8 text-white" />,
  },
  [WasteCategory.DRY]: {
    name: WasteCategory.DRY,
    color: 'bg-red-600',
    icon: <DryIcon className="h-8 w-8 text-white" />,
  },
};
