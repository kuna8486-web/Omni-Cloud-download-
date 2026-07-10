import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
}

export interface Screenshot {
  id: string;
  url: string;
}

export interface InstallStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Release {
  version: string;
  releaseDate: string;
  size: string;
  whatsNew: string;
  bugFixes: string;
  performance: string;
  apkUrl: string;
}

export interface AppData {
  heroBackgroundUrl: string;
  appDescription: string;
  developerPhotoUrl: string;
  developerName: string;
  developerBio: string;
  features: AppFeature[];
  useCases: UseCase[];
  screenshots: Screenshot[];
  installSteps: InstallStep[];
  faqs: FAQ[];
  latestRelease: Release | null;
  contactEmail: string;
  contactTelegram: string;
  contactGithub: string;
  contactWebsite: string;
}

interface AdminStore {
  data: AppData;
  updateData: (partialData: Partial<AppData>) => void;
}

const defaultData: AppData = {
  heroBackgroundUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  appDescription: 'Omni Cloud is your ultimate personal cloud storage solution. Store, organize, and access your files from anywhere with uncompromised security and a beautiful interface.',
  developerPhotoUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2670&auto=format&fit=crop',
  developerName: 'Omni Studios',
  developerBio: 'We are passionate about creating beautiful, functional software that respects your privacy and simplifies your digital life.',
  features: [
    { id: '1', title: 'Easy Access', description: 'Access your files instantly from any device, anywhere in the world.', iconName: 'cloud' },
    { id: '2', title: 'Organized Management', description: 'Keep your digital life tidy with intuitive folders and tagging.', iconName: 'folder-tree' },
    { id: '3', title: 'Lightning Fast', description: 'Experience rapid uploads and downloads optimized for all networks.', iconName: 'zap' },
    { id: '4', title: 'Secure & Private', description: 'Your data is encrypted and secure. We value your privacy above all.', iconName: 'shield' },
  ],
  useCases: [
    { id: '1', title: 'Store Important Documents', description: 'Keep your passports, IDs, and critical PDFs safe and accessible.' },
    { id: '2', title: 'Travel Photos', description: 'Automatically back up your memories while you explore the world.' },
    { id: '3', title: 'Study Materials', description: 'Organize lecture notes, syllabi, and textbooks for easy reviewing.' },
  ],
  screenshots: [
    { id: '1', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop' },
    { id: '2', url: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2670&auto=format&fit=crop' },
  ],
  installSteps: [
    { id: '1', stepNumber: 1, title: 'Download APK', description: 'Click the download button to get the latest APK file.', imageUrl: '' },
    { id: '2', stepNumber: 2, title: 'Allow Unknown Sources', description: 'Go to Settings > Security and enable installing from unknown sources.', imageUrl: '' },
    { id: '3', stepNumber: 3, title: 'Install & Enjoy', description: 'Open the downloaded file and follow the prompts to install.', imageUrl: '' },
  ],
  faqs: [
    { id: '1', question: 'How do I install the app?', answer: 'Download the APK from this site, allow unknown sources in your Android settings, and open the file to install.' },
    { id: '2', question: 'Is my data secure?', answer: 'Yes, we use industry-standard encryption to ensure your files remain private and secure.' },
    { id: '3', question: 'How do I update the app?', answer: 'Simply visit this website and download the latest APK. Installing it will update your current version without losing data.' },
  ],
  latestRelease: {
    version: '1.0.0',
    releaseDate: '2023-10-25',
    size: '24.5 MB',
    whatsNew: 'Initial release of Omni Cloud!',
    bugFixes: 'None yet.',
    performance: 'Optimized core engine for fast syncing.',
    apkUrl: '',
  },
  contactEmail: 'hello@omnicloud.app',
  contactTelegram: '@omnicloud',
  contactGithub: 'omnicloud-dev',
  contactWebsite: 'https://omnicloud.app',
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      data: defaultData,
      updateData: (partialData) =>
        set((state) => ({
          data: { ...state.data, ...partialData },
        })),
    }),
    {
      name: 'omni-cloud-storage',
    }
  )
);
