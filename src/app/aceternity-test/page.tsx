import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Page Not Available - CHKware',
  description: 'This page is not currently available.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AceternityTestPage() {
  // Redirect to homepage for launch
  redirect('/');
}