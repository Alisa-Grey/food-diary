import { Diary } from '@/screens/Diary/Diary';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Diary />
    </main>
  );
}
