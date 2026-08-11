import * as Select from '@radix-ui/react-select';
import { 
  Calendar, 
  Check,
  ChevronDown, 
  Globe, 
  Sparkles, 
  Star,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '../components/magicui/blur-fade';
import creatorData from '../data/creators.json';
import duoLeaderboardImg from '../assets/duo-leaderboard.png';
import './dashboard.css';

function CrownIcon({ color, rank }: { color: string; rank: number }) {
  return (
    <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 24 24" fill={color} style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <path d="M3 19h18v2H3v-2zm2-14l3 5 4-7 4 7 3-5v10H5V5z" />
      </svg>
      <span style={{ position: 'relative', color: '#fff', fontSize: '13px', fontWeight: 900, top: '2px' }}>
        {rank}
      </span>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  return (
    <motion.section
      key='leaderboard'
      className='leaderboard-screen'
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}>
      
      <button className='logout-btn' type='button' onClick={() => navigate('/')}>
        Log Out
        <LogOut size={16} strokeWidth={2.5} />
      </button>

      <div className="top-nav-tabs">
        <button className="tab active">Leaderboard</button>
        <button className="tab" onClick={() => navigate('/rewards')}>Rewards</button>
        <button className="tab" onClick={() => navigate('/faqs')}>FAQs</button>
      </div>

      <BlurFade>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
          <div className='leaderboard-heading' style={{ marginTop: 0, flex: 1, paddingRight: '16px' }}>
            <h1 style={{ fontSize: '26px', color: '#1f2430', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              Creator Leaderboard
            </h1>
            <p style={{ marginTop: '8px', color: '#777777', fontSize: '14px', lineHeight: 1.5, fontWeight: 500 }}>
              Celebrate our amazing creators who inspire language learning!
            </p>
          </div>

          <motion.div 
            style={{ width: '130px', flexShrink: 0 }}
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          >
            <motion.img
              src={duoLeaderboardImg}
              alt="Duo Trophy"
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </BlurFade>

      <BlurFade delay={0.1}>
        <div className="filters-row">
          <Select.Root defaultValue="may-2025">
            <Select.Trigger className="filter-pill">
              <Calendar size={16} /> 
              <Select.Value /> 
              <ChevronDown size={16} style={{ marginLeft: '4px' }} />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="filter-menu" position="popper" sideOffset={8}>
                <Select.Viewport>
                  <Select.Item className="filter-option" value="apr-2025">
                    <Select.ItemText>April 2025</Select.ItemText>
                    <Select.ItemIndicator className="filter-indicator"><Check size={16} /></Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item className="filter-option" value="may-2025">
                    <Select.ItemText>May 2025</Select.ItemText>
                    <Select.ItemIndicator className="filter-indicator"><Check size={16} /></Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item className="filter-option" value="jun-2025">
                    <Select.ItemText>June 2025</Select.ItemText>
                    <Select.ItemIndicator className="filter-indicator"><Check size={16} /></Select.ItemIndicator>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <Select.Root defaultValue="all">
            <Select.Trigger className="filter-pill">
              <Globe size={16} /> 
              <Select.Value /> 
              <ChevronDown size={16} style={{ marginLeft: '4px' }} />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="filter-menu" position="popper" sideOffset={8}>
                <Select.Viewport>
                  <Select.Item className="filter-option" value="all">
                    <Select.ItemText>All Regions</Select.ItemText>
                    <Select.ItemIndicator className="filter-indicator"><Check size={16} /></Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item className="filter-option" value="asia">
                    <Select.ItemText>Indonesia</Select.ItemText>
                    <Select.ItemIndicator className="filter-indicator"><Check size={16} /></Select.ItemIndicator>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </BlurFade>

      <div className='ranking-list'>
        {creatorData.leaderboard.map((creator, index) => {
          const isYou = creator.name === 'Kamu' || creator.name === 'You';
          
          return (
            <motion.article
              key={creator.id}
              className={`creator-row ${isYou ? 'creator-row--you' : ''}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + index * 0.06 }}>
              
              <div className='rank-col'>
                {index === 0 && <CrownIcon color="#f4ae00" rank={1} />}
                {index === 1 && <CrownIcon color="#8f9aa9" rank={2} />}
                {index === 2 && <CrownIcon color="#c98251" rank={3} />}
                {index > 2 && <span>{index + 1}</span>}
              </div>

              <div className='avatar-col'>
                <img 
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${creator.name}&backgroundColor=e5e5e5`} 
                  alt={creator.name} 
                />
              </div>

              <div className='creator-info'>
                <strong>{creator.name}</strong>
              </div>

              <div className='points-aura'>
                <strong>{creator.points.toLocaleString('en-US')} Aura</strong>
                <Sparkles size={18} fill="#58cc02" color="#58cc02" />
              </div>

            </motion.article>
          );
        })}
      </div>

      <BlurFade delay={0.4}>
        <div className="bottom-banner">
          <Star size={24} color="#58cc02" strokeWidth={2.5} />
          <p>Keep creating amazing content and climb the leaderboard!</p>
          <Sparkles size={20} color="#b9e66c" />
        </div>
      </BlurFade>
      
    </motion.section>
  );
}

export default Dashboard;