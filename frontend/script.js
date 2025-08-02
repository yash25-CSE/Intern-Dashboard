
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Redirect to dashboard (no actual auth)
  window.location.href = 'dashboard.html?id=1';
});

async function loadDashboardData() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id') || 1;
  
  try {
    const response = await fetch(`http://localhost:3001/api/user/${userId}`);
    const userData = await response.json();
    
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('referralCode').textContent = userData.referralCode;
    document.getElementById('donationAmount').textContent = `$${userData.amountRaised}`;
    
    const rewardsList = document.getElementById('rewardsList');
    if(userData.rewards && userData.rewards.length > 0) {
      rewardsList.innerHTML = userData.rewards.map(reward => 
        `<li>${reward}</li>`
      ).join('');
    } else {
      rewardsList.innerHTML = '<li>No rewards unlocked yet</li>';
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

async function loadLeaderboard() {
  try {
    const response = await fetch('http://localhost:3001/api/leaderboard');
    const leaderboardData = await response.json();
    
    const tableBody = document.querySelector('#leaderboard tbody');
    tableBody.innerHTML = leaderboardData.map((user, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>$${user.amount}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  if(window.location.pathname.includes('dashboard.html')) {
    loadDashboardData();
  }
  
  if(window.location.pathname.includes('leaderboard.html')) {
    loadLeaderboard();
  }
});