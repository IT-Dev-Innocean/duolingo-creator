import { 
  Sparkles, 
  Heart, 
  Eye, 
  User, 
  Edit3, 
  Trophy, 
  LogOut,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '../components/magicui/blur-fade';
import './faqs.css';

const categoryRewards = [
  { id: 1, icon: <User size={24} color="#58cc02" />, bg: '#eaffd6', title: 'Complete Creator Profile', desc: "Creator's Profile", aura: 20 },
  { id: 2, icon: <User size={24} color="#58cc02" />, bg: '#eaffd6', title: 'Join Creator Community', desc: "Creator's Profile", aura: 20 },
  { id: 3, icon: <Edit3 size={24} color="#1cb0f6" />, bg: '#e8f7ff', title: 'Participate & Publish Content', desc: "Content Creation • Approved content", aura: 50 },
  { id: 4, icon: <Edit3 size={24} color="#1cb0f6" />, bg: '#e8f7ff', title: 'Achieve Campaign KPI', desc: "Content Creation • Maintain or upgrade tier", aura: 30 },
  { id: 5, icon: <Trophy size={24} color="#f4ae00" />, bg: '#fff9e6', title: 'Complete Monthly Challenge', desc: "Engagement • Based on tiering", aura: 100 },
  { id: 6, icon: <Trophy size={24} color="#f4ae00" />, bg: '#fff9e6', title: 'Join Community Meetup', desc: "Engagement & Community", aura: 50 },
  { id: 7, icon: <Trophy size={24} color="#f4ae00" />, bg: '#fff9e6', title: 'Become Creator of the Month', desc: "Engagement • Top 3 Leaderboard", aura: 250 },
];

const performanceRewards = [
  { id: 1, icon: <Heart size={24} color="#ff4b4b" />, bg: '#ffebee', title: '1,000 Likes', desc: 'Bonus per post', aura: 20 },
  { id: 2, icon: <Heart size={24} color="#ff4b4b" />, bg: '#ffebee', title: '10,000 Likes', desc: 'Bonus per post', aura: 100 },
  { id: 3, icon: <Eye size={24} color="#00b894" />, bg: '#e8f8f5', title: '1,000 Views', desc: 'Bonus per post', aura: 20 },
  { id: 4, icon: <Eye size={24} color="#00b894" />, bg: '#e8f8f5', title: '10,000 Views', desc: 'Bonus per post', aura: 100 },
];

function Faqs() {
  const navigate = useNavigate();

  return (
    <motion.section
      key='faqs'
      className='faqs-screen'
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}>
      
      <button className='logout-btn' type='button' onClick={() => navigate('/')}>
        Log Out
        <LogOut size={16} strokeWidth={2.5} />
      </button>

      <div className="top-nav-tabs">
        <button className="tab" onClick={() => navigate('/dashboard')}>Leaderboard</button>
        <button className="tab" onClick={() => navigate('/rewards')}>Rewards</button>
        <button className="tab active">FAQs</button>
      </div>

      <BlurFade>
        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', color: '#1f2430', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Collect the AURA
          </h1>
          <p style={{ marginTop: '8px', color: '#777777', fontSize: '14px', lineHeight: 1.5, fontWeight: 500 }}>
            Pelajari cara mengumpulkan Aura dan tukarkan dengan hadiah eksklusif!
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.1}>
        <div className="faq-section">
          <h3 className="section-title">
            <Sparkles size={18} color="#58cc02" fill="#58cc02" />
            Aura by Category
          </h3>
          
          <div className="duo-list-card">
            {categoryRewards.map((item) => (
              <div className="duo-list-row" key={item.id}>
                <div className="duo-icon-wrap" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <div className="duo-info">
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                </div>
                <div className="duo-aura-points">
                  <strong>+{item.aura}</strong>
                  <Sparkles size={14} fill="#58cc02" color="#58cc02" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="faq-section" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="section-title" style={{ margin: 0 }}>
              Performance Bonus
            </h3>
            <span className="per-post-badge">PER POST</span>
          </div>
          
          <div className="duo-list-card">
            {performanceRewards.map((item) => (
              <div className="duo-list-row" key={item.id}>
                <div className="duo-icon-wrap" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <div className="duo-info">
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                </div>
                <div className="duo-aura-points">
                  <strong>+{item.aura}</strong>
                  <Sparkles size={14} fill="#58cc02" color="#58cc02" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="bottom-banner faq-notes-banner">
          <div className="notes-icon-circle">
            <HelpCircle size={20} color="#f4ae00" strokeWidth={2.5} />
          </div>
          <ul className="notes-list">
            <li>Bonus Aura dihitung per postingan dan dapat diakumulasi (stack).</li>
            <li>Semua Aura akan otomatis ditambahkan ke saldo total kamu.</li>
            <li>Terus buat konten menarik dan inspirasi lebih banyak orang!</li>
          </ul>
        </div>
      </BlurFade>

    </motion.section>
  );
}

export default Faqs;