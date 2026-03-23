import { NavLink } from 'react-router-dom';

const menus = [
  { to: '/', label: '홈', icon: '🏠' },
  { to: '/ox', label: 'OX', icon: '⭕' },
  { to: '/frequent', label: '기출', icon: '🔥' },
  { to: '/sql', label: 'SQL', icon: '🧪' },
  { to: '/wrong', label: '오답', icon: '📝' },
  { to: '/bookmarks', label: '북마크', icon: '⭐' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {menus.map((menu) => (
        <NavLink key={menu.to} to={menu.to} className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span>{menu.icon}</span>
          <span>{menu.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
