import { ArrowLeft, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '../components/magicui/blur-fade';
import creatorData from '../data/creators.json';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <motion.section
      key='leaderboard'
      className='leaderboard-screen'
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}>
      <button
        className='back-button'
        type='button'
        onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        Keluar
      </button>

      <BlurFade>
        <div className='leaderboard-heading'>
          <span className='eyebrow'>Creator hub</span>
          <h1>Creator Leaderboard</h1>
          <p>Performa komunitas minggu ini.</p>
        </div>
      </BlurFade>

      <BlurFade delay={0.1}>
        <div className='progress-card'>
          <div>
            <small>Posisimu</small>
            <strong>#4</strong>
          </div>
          <span />
          <div>
            <small>Total XP</small>
            <strong>
              {creatorData.currentCreator.points.toLocaleString('id-ID')}
            </strong>
          </div>
          <span />
          <div>
            <small>Pertumbuhan</small>
            <strong className='growth'>
              <TrendingUp size={15} /> {creatorData.currentCreator.growth}%
            </strong>
          </div>
        </div>
      </BlurFade>

      <div className='ranking-list'>
        {creatorData.leaderboard.map((creator, index) => (
          <motion.article
            key={creator.id}
            className={`creator-row ${creator.name === 'Kamu' ? 'creator-row--you' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + index * 0.06 }}>
            <b className={`rank rank--${index + 1}`}>{index + 1}</b>
            <div className='avatar'>{creator.avatar}</div>
            <div className='creator-info'>
              <strong>{creator.name}</strong>
              <small>{creator.handle}</small>
            </div>
            <div className='points'>
              <strong>{creator.points.toLocaleString('id-ID')}</strong>
              <small>XP</small>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export default Dashboard;
