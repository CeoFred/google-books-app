import Books from '@/components/ui/organisms/MyBooks';
import HomeLayout from '@/layouts/HomeLayout';
import MetaTag from '@/components/ui/atoms/MetaTag';

export default function MyBooks() {
  return (
    <HomeLayout>
      <MetaTag title="Home" description="" url="/mybooks" />
      <Books />
    </HomeLayout>
  );
}
