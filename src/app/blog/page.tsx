import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Coming Soon - CHKware Blog',
  description: 'Our blog is coming soon with insights on API testing and development.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogPage() {
  // Redirect to homepage for now
  redirect('/');
}