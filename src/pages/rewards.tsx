import { useState } from 'react';
import { Heart, Lock, Sparkles, CheckCircle, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '../components/magicui/blur-fade';
import creatorData from '../data/creators.json';
import duoRewardImg from '../assets/duolingo-reward.png';
import './rewards.css';

const rewardsList = [
  { id: 1, title: 'Enamel Pin', desc: 'Exclusive enamel pin with creator design.', cost: 250, icon: '📌' },
  { id: 2, title: 'Mini Pouch', desc: 'Compact pouch for your daily essentials.', cost: 500, icon: '👝' },
  { id: 3, title: 'Ceramic Mug', desc: 'Premium branded ceramic mug.', cost: 1000, icon: '☕' },
  { id: 4, title: 'Tote Bag', desc: 'Everyday tote bag with Duo illustration.', cost: 2500, icon: '🛍️' },
  { id: 5, title: 'T-shirt', desc: 'Exclusive Creator Community t-shirt.', cost: 4000, icon: '👕' },
  { id: 6, title: 'Hat', desc: 'Comfortable hat with embroidered logo.', cost: 5000, icon: '🧢' },
  { id: 7, title: 'Hoodie', desc: 'Premium Duolingo Creator hoodie.', cost: 8000, icon: '🧥' },
  { id: 8, title: 'Vest', desc: 'Stylish vest for everyday wear.', cost: 10000, icon: '🦺' },
  { id: 9, title: 'Creator Starter Kit', desc: 'Ring light, phone tripod, and creator essentials.', cost: 12000, icon: '📸' },
  { id: 10, title: 'Community Workshop Pass', desc: 'Access to an exclusive creator workshop.', cost: 18000, icon: '🎟️' },
  { id: 11, title: 'Grand Prize Tour', desc: 'Win a memorable trip to Cappadocia or Beijing!', cost: 50000, icon: '✈️' },
];

function Rewards() {
  const navigate = useNavigate();
  const [userAura, setUserAura] = useState(creatorData.currentCreator.points);
  const [showPopup, setShowPopup] = useState(false);
  const [redeemedItem, setRedeemedItem] = useState<{ title: string; icon: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'available' | 'redeemed'>('available');
  const [redeemedList, setRedeemedList] = useState<typeof rewardsList>([]);

  const availableList = rewardsList.filter(
    (item) => !redeemedList.find((redeemed) => redeemed.id === item.id)
  );

  const handleRedeem = (item: { id: number; title: string; cost: number; desc: string; icon: string }) => {
    if (userAura >= item.cost) {
      setUserAura((prev) => prev - item.cost);
      setRedeemedList((prev) => [...prev, item]);
      setRedeemedItem(item);
      setShowPopup(true);
    }
  };

  return (
    <>
      <motion.section
        key='rewards'
        className='rewards-screen'
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}>

        <button className='logout-btn' type='button' onClick={() => navigate('/')}>
          Log Out
          <LogOut size={16} strokeWidth={2.5} />
        </button>

        <div className="top-nav-tabs">
          <button className="tab" onClick={() => navigate('/dashboard')}>Leaderboard</button>
          <button className="tab active">Rewards</button>
          <button className="tab" onClick={() => navigate('/faqs')}>FAQs</button>
        </div>

        <BlurFade>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <div className='rewards-heading' style={{ marginTop: 0, flex: 1, paddingRight: '16px' }}>
              <h1 style={{ fontSize: '26px', color: '#1f2430', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                Your Rewards
              </h1>
              <p style={{ marginTop: '8px', color: '#777777', fontSize: '14px', lineHeight: 1.5, fontWeight: 500 }}>
                Use your Aura to unlock exclusive rewards and perks!
              </p>
            </div>

            <motion.div 
              style={{ width: '130px', flexShrink: 0 }}
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
            >
              <motion.img
                src={duoRewardImg}
                alt="Duo Reward"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="aura-card">
            <div className="aura-card-text">
              <small>Your Aura <Sparkles size={12} color="#f4ae00" fill="#f4ae00" /></small>
              <strong>{userAura.toLocaleString('id-ID')} Aura</strong>
            </div>
            <div className="aura-sparks">
               <Sparkles size={24} color="#b9e66c" fill="#b9e66c" />
               <Sparkles size={16} color="#87c747" fill="#87c747" style={{ marginTop: '12px' }} />
            </div>
          </div>
        </BlurFade>

        <div style={{ marginTop: '24px' }}>
          <div className="segmented-control">
            <button
              className={`segment-btn ${activeTab === 'available' ? 'active' : ''}`}
              onClick={() => setActiveTab('available')}
            >
              Available
            </button>
            <button
              className={`segment-btn ${activeTab === 'redeemed' ? 'active' : ''}`}
              onClick={() => setActiveTab('redeemed')}
            >
              Redeemed
            </button>
          </div>
          
          <div className='rewards-list'>
            {activeTab === 'available' && (
              availableList.length === 0 ? (
                <div className="empty-state">
                  <p>Semua hadiah telah ditukarkan!</p>
                </div>
              ) : (
                availableList.map((item, index) => {
                  const isUnlocked = userAura >= item.cost;

                  return (
                    <motion.article
                      key={item.id}
                      className="reward-row"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.05 }}>
                      
                      <div className="reward-icon-wrap">
                        {item.icon}
                      </div>

                      <div className="reward-info">
                        <strong>{item.title}</strong>
                        <small>{item.desc}</small>
                      </div>

                      <div className="reward-cost">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <strong className="aura-points">{item.cost.toLocaleString('id-ID')} Aura</strong>
                          <Sparkles size={16} fill="#58cc02" color="#58cc02" />
                        </div>
                        
                        {isUnlocked ? (
                          <button 
                            className="redeem-btn" 
                            onClick={() => handleRedeem(item)}>
                            Redeem
                          </button>
                        ) : (
                          <Lock size={16} color="#afafaf" strokeWidth={2.5} style={{ marginTop: '4px' }} />
                        )}
                      </div>
                    </motion.article>
                  );
                })
              )
            )}

            {activeTab === 'redeemed' && (
              redeemedList.length === 0 ? (
                <div className="empty-state">
                  <p>Belum ada hadiah yang ditukarkan.</p>
                </div>
              ) : (
                redeemedList.map((item, index) => (
                  <motion.article
                    key={item.id}
                    className="reward-row reward-row--redeemed"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05 }}>
                    
                    <div className="reward-icon-wrap">
                      {item.icon}
                    </div>

                    <div className="reward-info">
                      <strong>{item.title}</strong>
                      <small>Berhasil ditukarkan</small>
                    </div>

                    <div className="reward-status">
                      <CheckCircle size={20} color="#58cc02" strokeWidth={2.5} />
                    </div>
                  </motion.article>
                ))
              )
            )}
          </div>
        </div>

        <BlurFade delay={0.4}>
          <div className="bottom-banner reward-banner">
            <div className="heart-circle">
               <Heart size={20} color="#58cc02" strokeWidth={2.5} />
            </div>
            <p>Thank you for being an amazing part of the Duolingo Creator Community!</p>
            <div className="banner-sparks">
              <Sparkles size={16} color="#b9e66c" fill="#b9e66c" />
              <Sparkles size={10} color="#87c747" fill="#87c747" />
            </div>
          </div>
        </BlurFade>
      </motion.section>

      <AnimatePresence>
        {showPopup && redeemedItem && (
          <motion.div 
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="popup-card"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            >
              <div className="popup-icon">{redeemedItem.icon}</div>
              <h2>Redeem Berhasil!</h2>
              <p>Kamu telah menukarkan Aura kamu dengan <strong>{redeemedItem.title}</strong>.</p>
              <button className="popup-close-btn" onClick={() => setShowPopup(false)}>
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Rewards;