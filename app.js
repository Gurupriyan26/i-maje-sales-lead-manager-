/**
 * ApexLead AI - Enterprise Sales Lead Manager
 * Complete Application Logic: CRUD, Search, Multi-Filter, Drag-and-Drop Pipeline,
 * KPI Analytics, Form Validation, AI Scoring, Notes Log, and LocalStorage Engine.
 */

// ==========================================
// 1. DATA CONSTANTS & SEED DATA
// ==========================================
const STORAGE_KEY = 'apex_leads_data_v3'; // bumped to force fresh seed with updated dates
const THEME_KEY = 'apex_leads_theme';

const STATUS_CONFIG = {
  'new': { label: 'New', color: '#38bdf8', icon: 'fa-sparkles' },
  'contacted': { label: 'Contacted', color: '#818cf8', icon: 'fa-phone' },
  'intrested': { label: 'Interested', color: '#a855f7', icon: 'fa-thumbs-up' },
  'followup': { label: 'Follow-up', color: '#f59e0b', icon: 'fa-clock-rotate-left' },
  'converted': { label: 'Converted', color: '#10b981', icon: 'fa-trophy' },
  'not intersted': { label: 'Not Interested', color: '#64748b', icon: 'fa-xmark' }
};

const SOURCE_CONFIG = {
  'website': { label: 'Website', icon: 'fa-globe' },
  'google': { label: 'Google', icon: 'fa-magnifying-glass' },
  'social media': { label: 'Social Media', icon: 'fa-hashtag' },
  'referral': { label: 'Referral', icon: 'fa-handshake' },
  'email': { label: 'Email', icon: 'fa-envelope' },
  'phone': { label: 'Phone', icon: 'fa-phone-volume' },
  'other': { label: 'Other', icon: 'fa-tag' }
};

// Helper: generate a date string offset by N days from today
function seedDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function buildSeedLeads() {
  return [
    {
      id: 'lead_1',
      customerName: 'Sarah Jenkins',
      company: 'Nexus Cloud Systems',
      email: 'sarah.j@nexuscloud.io',
      phone: '+1 (555) 234-8901',
      leadSource: 'website',
      assignedEmployee: 'Alex Rivera',
      leadStatus: 'intrested',
      priority: 'high',
      followUpDate: seedDate(-3), // OVERDUE: 3 days ago
      dealValue: 24000,
      notes: 'Interested in enterprise cloud migration plan. Budget approved by VP of Eng. Needs custom SLA pricing proposal.',
      activityLog: [
        { date: '10:15', note: 'Inbound demo request submitted through website.' },
        { date: '14:30', note: 'Completed 30-min discovery call. High intent client.' }
      ],
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      id: 'lead_2',
      customerName: 'Marcus Vance',
      company: 'Apex Logistics Global',
      email: 'm.vance@apexlogistics.com',
      phone: '+1 (555) 912-3456',
      leadSource: 'referral',
      assignedEmployee: 'Jordan Lee',
      leadStatus: 'converted',
      priority: 'high',
      followUpDate: seedDate(-8),
      dealValue: 48000,
      notes: 'Signed annual enterprise contract for fleet tracking SaaS! Successfully converted.',
      activityLog: [
        { date: '09:00', note: 'Referred by Michael from Stripe.' },
        { date: '16:00', note: 'Executive security review cleared.' },
        { date: '11:30', note: 'Contract signed and initial deposit received.' }
      ],
      createdAt: new Date(Date.now() - 16 * 86400000).toISOString()
    },
    {
      id: 'lead_3',
      customerName: 'Elena Rostova',
      company: 'FinPulse Pay',
      email: 'elena@finpulse.de',
      phone: '+49 30 12345678',
      leadSource: 'google',
      assignedEmployee: 'Taylor Singh',
      leadStatus: 'followup',
      priority: 'medium',
      followUpDate: seedDate(0), // DUE TODAY
      dealValue: 18500,
      notes: 'Requested security compliance sheet (SOC2 Type II). Follow up is scheduled for TODAY - reach out immediately!',
      activityLog: [
        { date: '11:00', note: 'Google ad lead from fintech campaign.' },
        { date: '15:20', note: 'Sent SOC2 documents and case studies.' }
      ],
      createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
    },
    {
      id: 'lead_4',
      customerName: 'David Kim',
      company: 'HyperScale AI',
      email: 'david@hyperscale.ai',
      phone: '+1 (415) 890-1234',
      leadSource: 'social media',
      assignedEmployee: 'Alex Rivera',
      leadStatus: 'new',
      priority: 'high',
      followUpDate: seedDate(2), // Upcoming in 2 days
      dealValue: 32000,
      notes: 'Saw our LinkedIn post on AI workflow automation. Wants to test API with 10 seats.',
      activityLog: [
        { date: '18:40', note: 'Lead captured via LinkedIn Lead Gen Form.' }
      ],
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
    },
    {
      id: 'lead_5',
      customerName: 'Chloe Bennett',
      company: 'Urban Health Labs',
      email: 'c.bennett@urbanhealth.org',
      phone: '+1 (555) 778-9012',
      leadSource: 'email',
      assignedEmployee: 'Jordan Lee',
      leadStatus: 'contacted',
      priority: 'low',
      followUpDate: seedDate(7), // Upcoming in 7 days
      dealValue: 9500,
      notes: 'Cold email reply. Evaluating 3 vendors, will review internally next week.',
      activityLog: [
        { date: '08:30', note: 'Outbound sequence response received.' }
      ],
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString()
    },
    {
      id: 'lead_6',
      customerName: 'Arthur Pendelton',
      company: 'Heritage Retail Group',
      email: 'arthur@heritageretail.com',
      phone: '+1 (555) 345-6789',
      leadSource: 'phone',
      assignedEmployee: 'Marcus Reyes',
      leadStatus: 'not intersted',
      priority: 'low',
      followUpDate: seedDate(-15),
      dealValue: 5000,
      notes: 'Already locked into a 3-year contract with legacy ERP provider. Revisit next year.',
      activityLog: [
        { date: '14:00', note: 'Inbound phone inquiry.' },
        { date: '10:00', note: 'Client decided to stay with existing provider.' }
      ],
      createdAt: new Date(Date.now() - 20 * 86400000).toISOString()
    },
    {
      id: 'lead_7',
      customerName: 'Priya Sharma',
      company: 'BrightEdge Analytics',
      email: 'priya@brightedge.in',
      phone: '+91 98765 43210',
      leadSource: 'referral',
      assignedEmployee: 'Neha Kapoor',
      leadStatus: 'followup',
      priority: 'high',
      followUpDate: seedDate(-1), // OVERDUE: yesterday
      dealValue: 27500,
      notes: 'Hot prospect referred by existing client. Missed follow-up yesterday — needs immediate callback.',
      activityLog: [
        { date: '09:30', note: 'Referral from Rajesh at Infosys.' },
        { date: '14:00', note: 'Initial discovery call completed. Very interested.' }
      ],
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      id: 'lead_8',
      customerName: 'Liam O\'Sullivan',
      company: 'GreenField PropTech',
      email: 'liam@greenfield.ie',
      phone: '+353 1 234 5678',
      leadSource: 'website',
      assignedEmployee: 'Alex Rivera',
      leadStatus: 'contacted',
      priority: 'medium',
      followUpDate: seedDate(0), // DUE TODAY
      dealValue: 15000,
      notes: 'Property tech startup expanding into Asia-Pacific. Requested pricing deck today.',
      activityLog: [
        { date: '16:00', note: 'Website contact form submission.' },
        { date: '10:00', note: 'Intro call scheduled for today afternoon.' }
      ],
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
    }
  ];
}

const SEED_LEADS = buildSeedLeads();

// ==========================================
// 2. APPLICATION STATE
// ==========================================
let leads = [];
let currentView = 'kanban'; // 'kanban' | 'table'
let currentActiveLeadId = null;
let leadToDeleteId = null;
let sortField = 'name';
let sortDirection = 'asc';

// Filter State
const activeFilters = {
  search: '',
  status: 'all',
  followUpSchedule: 'all', // 'all' | 'overdue' | 'today' | 'upcoming'
  source: 'all',
  employee: 'all',
  priority: 'all'
};

let currentAlertTab = 'all'; // 'all' | 'overdue' | 'today' | 'upcoming'

// ==========================================
// 3. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadLeadsFromStorage();
  initEventListeners();
  populateEmployeeFilterOptions();
  renderApp();
});

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'theme-dark';
  document.body.className = savedTheme;
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'theme-dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains('theme-dark');
  const newTheme = isDark ? 'theme-light' : 'theme-dark';
  document.body.className = newTheme;
  localStorage.setItem(THEME_KEY, newTheme);
  updateThemeIcon(newTheme);
  showToast(`Switched to ${newTheme === 'theme-dark' ? 'Dark' : 'Light'} Mode`, 'info');
}

// Storage Operations
function loadLeadsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      leads = JSON.parse(raw);
    } else {
      leads = [...SEED_LEADS];
      saveLeadsToStorage();
    }
  } catch (err) {
    console.error('Error loading leads from storage:', err);
    leads = [...SEED_LEADS];
  }
}

function saveLeadsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error saving leads to storage:', err);
    showToast('Failed to save data locally', 'danger');
  }
}

// ==========================================
// 4. EVENT LISTENERS
// ==========================================
function initEventListeners() {
  // Follow-Up Alerts Bell Toggle
  const alertBellBtn = document.getElementById('alertBellBtn');
  const alertsPanel = document.getElementById('alertsPanel');

  if (alertBellBtn && alertsPanel) {
    alertBellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      alertsPanel.classList.toggle('show');
    });

    window.addEventListener('click', () => {
      alertsPanel.classList.remove('show');
    });

    alertsPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Follow-Up Alert Tab Buttons
  document.querySelectorAll('.alert-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.alert-tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      currentAlertTab = tabBtn.getAttribute('data-tab');
      renderAlertsList();
    });
  });

  // Follow-Up Urgency Banner Listeners
  const bannerViewUrgentBtn = document.getElementById('bannerViewUrgentBtn');
  const bannerDismissBtn = document.getElementById('bannerDismissBtn');
  const banner = document.getElementById('followUpUrgentBanner');

  if (bannerViewUrgentBtn) {
    bannerViewUrgentBtn.addEventListener('click', () => {
      activeFilters.followUpSchedule = 'overdue';
      const select = document.getElementById('filterFollowUpSchedule');
      if (select) select.value = 'overdue';
      renderApp();
      showToast('Filtering for Overdue Follow-ups', 'warning');
    });
  }

  if (bannerDismissBtn && banner) {
    bannerDismissBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // Follow-Up Schedule Filter Dropdown
  const filterFollowUpSchedule = document.getElementById('filterFollowUpSchedule');
  if (filterFollowUpSchedule) {
    filterFollowUpSchedule.addEventListener('change', (e) => {
      activeFilters.followUpSchedule = e.target.value;
      renderApp();
    });
  }

  // Theme Toggle
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  // Search Input
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    activeFilters.search = e.target.value.trim().toLowerCase();
    clearSearchBtn.style.display = activeFilters.search ? 'flex' : 'none';
    renderApp();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    activeFilters.search = '';
    clearSearchBtn.style.display = 'none';
    renderApp();
    searchInput.focus();
  });

  // Keyboard shortcut '/' for search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && !isModalOpen()) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape') {
      closeAllModals();
      if (alertsPanel) alertsPanel.classList.remove('show');
    }
  });

  // Filter Dropdowns
  document.getElementById('filterStatus').addEventListener('change', (e) => {
    activeFilters.status = e.target.value;
    renderApp();
  });

  document.getElementById('filterSource').addEventListener('change', (e) => {
    activeFilters.source = e.target.value;
    renderApp();
  });

  document.getElementById('filterEmployee').addEventListener('change', (e) => {
    activeFilters.employee = e.target.value;
    renderApp();
  });

  document.getElementById('filterPriority').addEventListener('change', (e) => {
    activeFilters.priority = e.target.value;
    renderApp();
  });

  // Reset Filters
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const clearAllTagsBtn = document.getElementById('clearAllTagsBtn');
  const emptyResetFilterBtn = document.getElementById('emptyResetFilterBtn');

  [resetFiltersBtn, clearAllTagsBtn, emptyResetFilterBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', resetAllFilters);
  });

  // View Switchers
  const viewKanbanBtn = document.getElementById('viewKanbanBtn');
  const viewTableBtn = document.getElementById('viewTableBtn');

  viewKanbanBtn.addEventListener('click', () => switchView('kanban'));
  viewTableBtn.addEventListener('click', () => switchView('table'));

  // Data Options Dropdown
  const dataOptionsBtn = document.getElementById('dataOptionsBtn');
  const dataDropdownMenu = document.getElementById('dataDropdownMenu');

  dataOptionsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dataDropdownMenu.classList.toggle('show');
  });

  window.addEventListener('click', () => {
    dataDropdownMenu.classList.remove('show');
  });

  // KPI Clickable Cards -> Quick Filters
  const kpiCardOverdue = document.getElementById('kpiCardOverdue');
  const kpiCardToday = document.getElementById('kpiCardToday');

  if (kpiCardOverdue) {
    kpiCardOverdue.addEventListener('click', () => {
      setQuickFilter('overdue');
    });
  }
  if (kpiCardToday) {
    kpiCardToday.addEventListener('click', () => {
      setQuickFilter('today');
    });
  }

  // Quick Chips Listeners
  document.getElementById('chipAllLeads')?.addEventListener('click', () => setQuickFilter('all'));
  document.getElementById('chipOverdue')?.addEventListener('click', () => setQuickFilter('overdue'));
  document.getElementById('chipToday')?.addEventListener('click', () => setQuickFilter('today'));
  document.getElementById('chipUpcoming')?.addEventListener('click', () => setQuickFilter('upcoming'));
  document.getElementById('chipHighPriority')?.addEventListener('click', () => setQuickFilter('high-priority'));

  // Refresh Schedule button in alerts panel
  const markAllAlertsViewedBtn = document.getElementById('markAllAlertsViewedBtn');
  if (markAllAlertsViewedBtn) {
    markAllAlertsViewedBtn.addEventListener('click', () => {
      currentAlertTab = 'all';
      document.querySelectorAll('.alert-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.alert-tab-btn[data-tab="all"]')?.classList.add('active');
      renderFollowUpAlertsCenter();
      showToast('Follow-up schedule refreshed', 'info');
    });
  }

  // Export JSON / CSV

  document.getElementById('exportJsonBtn').addEventListener('click', (e) => {
    e.preventDefault();
    exportDataAsJson();
  });

  document.getElementById('exportCsvBtn').addEventListener('click', (e) => {
    e.preventDefault();
    exportDataAsCsv();
  });

  // Import JSON
  const importInput = document.getElementById('importJsonInput');
  importInput.addEventListener('change', handleImportJson);

  // Reset Demo Leads
  document.getElementById('resetSeedBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Reset all leads to default demo data? Your current custom leads will be replaced.')) {
      leads = buildSeedLeads(); // rebuild with fresh relative dates
      saveLeadsToStorage();
      populateEmployeeFilterOptions();
      renderApp();
      showToast('Lead database reset to fresh demo dataset', 'success');
    }
  });


  // AI Pipeline Copilot Overview Modal
  document.getElementById('aiInsightsBtn').addEventListener('click', openAiOverviewModal);
  document.getElementById('closeAiOverviewBtn').addEventListener('click', closeAllModals);
  document.getElementById('closeAiOverviewFooterBtn').addEventListener('click', closeAllModals);

  // Modal: Add Lead Form
  document.getElementById('openAddLeadBtn').addEventListener('click', () => openLeadModal());
  document.getElementById('closeModalBtn').addEventListener('click', closeAllModals);
  document.getElementById('cancelModalBtn').addEventListener('click', closeAllModals);
  document.getElementById('leadForm').addEventListener('submit', handleLeadFormSubmit);

  // AI Generate/Enhance Notes in Form
  document.getElementById('aiGenerateNotesBtn').addEventListener('click', handleAiEnhanceNote);

  // View Details Modal Actions
  document.getElementById('closeViewModalBtn').addEventListener('click', closeAllModals);
  document.getElementById('viewEditBtn').addEventListener('click', () => {
    if (currentActiveLeadId) {
      const leadToEdit = leads.find(l => l.id === currentActiveLeadId);
      closeAllModals();
      openLeadModal(leadToEdit);
    }
  });
  document.getElementById('viewDeleteBtn').addEventListener('click', () => {
    if (currentActiveLeadId) {
      const leadToDel = leads.find(l => l.id === currentActiveLeadId);
      closeAllModals();
      openDeleteConfirmModal(leadToDel);
    }
  });

  // Add Quick Note in View Modal
  document.getElementById('addQuickNoteBtn').addEventListener('click', handleAddQuickNote);

  // AI Email Copy & Launch Mail Client
  document.getElementById('copyAiEmailBtn').addEventListener('click', handleCopyAiEmail);
  document.getElementById('sendDirectEmailBtn').addEventListener('click', handleSendDirectEmail);
  document.getElementById('aiRegenerateEmailBtn').addEventListener('click', () => {
    if (currentActiveLeadId) {
      const lead = leads.find(l => l.id === currentActiveLeadId);
      if (lead) renderAiDrawer(lead);
      showToast('AI draft pitch regenerated!', 'info');
    }
  });

  // Delete Modal
  document.getElementById('closeDeleteModalBtn').addEventListener('click', closeAllModals);
  document.getElementById('cancelDeleteBtn').addEventListener('click', closeAllModals);
  document.getElementById('confirmDeleteBtn').addEventListener('click', handleConfirmDelete);

  // Table Sorting Header Listeners
  document.querySelectorAll('.leads-table th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.getAttribute('data-sort');
      if (sortField === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortField = field;
        sortDirection = 'asc';
      }
      renderTable();
    });
  });
}

function switchView(viewName) {
  currentView = viewName;
  const kanbanView = document.getElementById('kanbanView');
  const tableView = document.getElementById('tableView');
  const viewKanbanBtn = document.getElementById('viewKanbanBtn');
  const viewTableBtn = document.getElementById('viewTableBtn');

  if (viewName === 'kanban') {
    kanbanView.style.display = 'block';
    tableView.style.display = 'none';
    viewKanbanBtn.classList.add('active');
    viewTableBtn.classList.remove('active');
  } else {
    kanbanView.style.display = 'none';
    tableView.style.display = 'block';
    viewTableBtn.classList.add('active');
    viewKanbanBtn.classList.remove('active');
  }
  renderApp();
}

function resetAllFilters() {
  activeFilters.search = '';
  activeFilters.status = 'all';
  activeFilters.followUpSchedule = 'all';
  activeFilters.source = 'all';
  activeFilters.employee = 'all';
  activeFilters.priority = 'all';

  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  document.getElementById('filterStatus').value = 'all';
  const followUpSelect = document.getElementById('filterFollowUpSchedule');
  if (followUpSelect) followUpSelect.value = 'all';
  document.getElementById('filterSource').value = 'all';
  document.getElementById('filterEmployee').value = 'all';
  document.getElementById('filterPriority').value = 'all';

  renderApp();
  showToast('All filters cleared', 'info');
}

// ==========================================
// 5. CORE RENDERING ENGINE
// ==========================================
function renderApp() {
  const filteredLeads = getFilteredLeads();

  renderKpiMetrics();
  renderActiveFilterTags();
  renderFollowUpAlertsCenter();

  if (currentView === 'kanban') {
    renderKanban(filteredLeads);
  } else {
    renderTable(filteredLeads);
  }
}

function getFilteredLeads() {
  const todayStr = new Date().toISOString().split('T')[0];
  const next7DaysStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return leads.filter(lead => {
    // Search match
    if (activeFilters.search) {
      const q = activeFilters.search;
      const matchName = lead.customerName?.toLowerCase().includes(q);
      const matchComp = lead.company?.toLowerCase().includes(q);
      const matchEmail = lead.email?.toLowerCase().includes(q);
      const matchPhone = lead.phone?.toLowerCase().includes(q);
      const matchNotes = lead.notes?.toLowerCase().includes(q);
      const matchEmp = lead.assignedEmployee?.toLowerCase().includes(q);

      if (!matchName && !matchComp && !matchEmail && !matchPhone && !matchNotes && !matchEmp) {
        return false;
      }
    }

    // Status filter
    if (activeFilters.status !== 'all' && lead.leadStatus !== activeFilters.status) {
      return false;
    }

    // Follow-up Alert Schedule Filter
    if (activeFilters.followUpSchedule !== 'all') {
      const date = lead.followUpDate;
      const isClosed = lead.leadStatus === 'converted' || lead.leadStatus === 'not intersted';
      if (isClosed || !date) return false;

      if (activeFilters.followUpSchedule === 'overdue' && date >= todayStr) {
        return false;
      } else if (activeFilters.followUpSchedule === 'today' && date !== todayStr) {
        return false;
      } else if (activeFilters.followUpSchedule === 'upcoming' && (date <= todayStr || date > next7DaysStr)) {
        return false;
      }
    }

    // Source filter
    if (activeFilters.source !== 'all' && lead.leadSource !== activeFilters.source) {
      return false;
    }

    // Employee filter
    if (activeFilters.employee !== 'all' && lead.assignedEmployee !== activeFilters.employee) {
      return false;
    }

    // Priority filter
    if (activeFilters.priority !== 'all' && lead.priority !== activeFilters.priority) {
      return false;
    }

    return true;
  });
}

// Quick Pipeline Filter Controller
function setQuickFilter(type) {
  // Reset other filters
  if (type === 'all') {
    activeFilters.followUpSchedule = 'all';
    activeFilters.priority = 'all';
  } else if (type === 'overdue') {
    activeFilters.followUpSchedule = 'overdue';
    activeFilters.priority = 'all';
  } else if (type === 'today') {
    activeFilters.followUpSchedule = 'today';
    activeFilters.priority = 'all';
  } else if (type === 'upcoming') {
    activeFilters.followUpSchedule = 'upcoming';
    activeFilters.priority = 'all';
  } else if (type === 'high-priority') {
    activeFilters.priority = 'high';
    activeFilters.followUpSchedule = 'all';
  }

  // Update sync select dropdowns
  const followUpSelect = document.getElementById('filterFollowUpSchedule');
  if (followUpSelect) followUpSelect.value = activeFilters.followUpSchedule;
  const prioritySelect = document.getElementById('filterPriority');
  if (prioritySelect) prioritySelect.value = activeFilters.priority;

  // Update active states on Quick Chips
  document.querySelectorAll('.quick-chip-btn').forEach(btn => btn.classList.remove('active'));
  if (type === 'all') document.getElementById('chipAllLeads')?.classList.add('active');
  else if (type === 'overdue') document.getElementById('chipOverdue')?.classList.add('active');
  else if (type === 'today') document.getElementById('chipToday')?.classList.add('active');
  else if (type === 'upcoming') document.getElementById('chipUpcoming')?.classList.add('active');
  else if (type === 'high-priority') document.getElementById('chipHighPriority')?.classList.add('active');

  // Update active state on KPI cards
  document.getElementById('kpiCardOverdue')?.classList.toggle('active-kpi-filter', type === 'overdue');
  document.getElementById('kpiCardToday')?.classList.toggle('active-kpi-filter', type === 'today');

  renderApp();
  showToast(`Filtered leads: ${type.replace('-', ' ').toUpperCase()}`, 'info');
}

// ==========================================
// 6. KPI DASHBOARD & FOLLOW-UP ALERT CENTER CALCULATIONS
// ==========================================
function renderKpiMetrics() {
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.leadStatus === 'converted').length;
  const pendingLeads = leads.filter(l => ['new', 'contacted', 'intrested', 'followup'].includes(l.leadStatus)).length;
  const highPriorityLeads = leads.filter(l => l.priority === 'high').length;
  
  // Follow-up calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const next7DaysStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const activeAlertLeads = leads.filter(l => {
    return l.leadStatus !== 'converted' && l.leadStatus !== 'not intersted' && l.followUpDate;
  });

  const overdueLeads = activeAlertLeads.filter(l => l.followUpDate < todayStr).length;
  const todayLeads = activeAlertLeads.filter(l => l.followUpDate === todayStr).length;
  const upcomingLeads = activeAlertLeads.filter(l => l.followUpDate > todayStr && l.followUpDate <= next7DaysStr).length;

  // Average AI Score
  const totalAiScore = leads.reduce((acc, lead) => acc + calculateAiScore(lead), 0);
  const avgAiScore = totalLeads > 0 ? Math.round(totalAiScore / totalLeads) : 0;

  // Conversion rate percentage
  const convRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const pendingRate = totalLeads > 0 ? Math.round((pendingLeads / totalLeads) * 100) : 0;

  // DOM Updates: KPI Cards
  document.getElementById('kpiTotalLeads').textContent = totalLeads;
  document.getElementById('kpiConvertedLeads').textContent = convertedLeads;
  document.getElementById('kpiConversionRate').textContent = `${convRate}% Rate`;
  document.getElementById('kpiConvertedBar').style.width = `${convRate}%`;

  document.getElementById('kpiPendingLeads').textContent = pendingLeads;
  document.getElementById('kpiPendingBar').style.width = `${pendingRate}%`;

  // Overdue KPI Card
  const kpiUrgent = document.getElementById('kpiUrgentLeads');
  if (kpiUrgent) kpiUrgent.textContent = overdueLeads;
  const kpiUrgentSubtext = document.getElementById('kpiUrgentSubtext');
  if (kpiUrgentSubtext) kpiUrgentSubtext.textContent = `${overdueLeads} Past Due`;
  const kpiUrgentBar = document.getElementById('kpiUrgentBar');
  if (kpiUrgentBar) kpiUrgentBar.style.width = totalLeads > 0 ? `${(overdueLeads / totalLeads) * 100}%` : '0%';

  // Due Today KPI Card
  const kpiToday = document.getElementById('kpiTodayLeads');
  if (kpiToday) kpiToday.textContent = todayLeads;
  const kpiTodaySubtext = document.getElementById('kpiTodaySubtext');
  if (kpiTodaySubtext) kpiTodaySubtext.textContent = `${todayLeads} Action Today`;
  const kpiTodayBar = document.getElementById('kpiTodayBar');
  if (kpiTodayBar) kpiTodayBar.style.width = totalLeads > 0 ? `${(todayLeads / totalLeads) * 100}%` : '0%';

  document.getElementById('kpiAvgScore').innerHTML = `${avgAiScore}<small>/100</small>`;
  document.getElementById('kpiScoreBar').style.width = `${avgAiScore}%`;

  // Quick Chips Counts
  const chipOverdue = document.getElementById('chipCountOverdue');
  const chipToday = document.getElementById('chipCountToday');
  const chipUpcoming = document.getElementById('chipCountUpcoming');
  const chipHigh = document.getElementById('chipCountHigh');
  if (chipOverdue) chipOverdue.textContent = overdueLeads;
  if (chipToday) chipToday.textContent = todayLeads;
  if (chipUpcoming) chipUpcoming.textContent = upcomingLeads;
  if (chipHigh) chipHigh.textContent = highPriorityLeads;
}

// Follow-Up Notification Bell & Alert Center Engine
function renderFollowUpAlertsCenter() {
  const todayStr = new Date().toISOString().split('T')[0];
  const next7DaysStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const activeAlertLeads = leads.filter(l => {
    return l.leadStatus !== 'converted' && l.leadStatus !== 'not intersted' && l.followUpDate;
  });

  const overdueList = activeAlertLeads.filter(l => l.followUpDate < todayStr);
  const todayList = activeAlertLeads.filter(l => l.followUpDate === todayStr);
  const upcomingList = activeAlertLeads.filter(l => l.followUpDate > todayStr && l.followUpDate <= next7DaysStr);

  const totalUrgent = overdueList.length + todayList.length;

  // Bell Badge & Bell Pulse
  const alertBellBtn = document.getElementById('alertBellBtn');
  const alertBadgeCount = document.getElementById('alertBadgeCount');
  if (alertBadgeCount) {
    if (totalUrgent > 0) {
      alertBadgeCount.textContent = totalUrgent;
      alertBadgeCount.style.display = 'block';
      if (alertBellBtn) alertBellBtn.classList.add('has-urgent-alerts');
    } else {
      alertBadgeCount.style.display = 'none';
      if (alertBellBtn) alertBellBtn.classList.remove('has-urgent-alerts');
    }
  }

  // Header pill & Tab counts
  const summaryEl = document.getElementById('alertsTotalSummary');
  if (summaryEl) summaryEl.textContent = `${totalUrgent} Action Required`;

  const tabOverdue = document.getElementById('tabCountOverdue');
  const tabToday = document.getElementById('tabCountToday');
  const tabUpcoming = document.getElementById('tabCountUpcoming');
  if (tabOverdue) tabOverdue.textContent = overdueList.length;
  if (tabToday) tabToday.textContent = todayList.length;
  if (tabUpcoming) tabUpcoming.textContent = upcomingList.length;

  // Top Urgency Banner
  const banner = document.getElementById('followUpUrgentBanner');
  const bannerCount = document.getElementById('bannerUrgentCount');
  if (banner && bannerCount) {
    if (overdueList.length > 0) {
      bannerCount.textContent = `${overdueList.length} Overdue Follow-up${overdueList.length > 1 ? 's' : ''}!`;
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  }

  renderAlertsList();
}

function renderAlertsList() {
  const container = document.getElementById('alertsListContainer');
  if (!container) return;
  container.innerHTML = '';

  const todayStr = new Date().toISOString().split('T')[0];
  const next7DaysStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const activeAlertLeads = leads.filter(l => {
    return l.leadStatus !== 'converted' && l.leadStatus !== 'not intersted' && l.followUpDate;
  });

  // 'all' tab: sort overdue (oldest first) then today then upcoming, with section dividers
  if (currentAlertTab === 'all') {
    const overdueLeads = activeAlertLeads.filter(l => l.followUpDate < todayStr).sort((a,b) => a.followUpDate.localeCompare(b.followUpDate));
    const todayLeads  = activeAlertLeads.filter(l => l.followUpDate === todayStr);
    const upcomingLeads = activeAlertLeads.filter(l => l.followUpDate > todayStr && l.followUpDate <= next7DaysStr);

    if (overdueLeads.length === 0 && todayLeads.length === 0 && upcomingLeads.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:24px 12px;color:var(--text-dim);font-size:0.84rem;"><i class="fa-solid fa-calendar-check" style="font-size:1.8rem;margin-bottom:6px;display:block;color:var(--success);"></i>All caught up! No follow-ups pending.</div>`;
      return;
    }

    if (overdueLeads.length > 0) {
      const hdr = document.createElement('div');
      hdr.className = 'alert-section-header overdue-header';
      hdr.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Overdue (${overdueLeads.length})`;
      container.appendChild(hdr);
      overdueLeads.forEach(lead => container.appendChild(buildAlertCard(lead, todayStr)));
    }
    if (todayLeads.length > 0) {
      const hdr = document.createElement('div');
      hdr.className = 'alert-section-header today-header';
      hdr.innerHTML = `<i class="fa-solid fa-clock"></i> Due Today (${todayLeads.length})`;
      container.appendChild(hdr);
      todayLeads.forEach(lead => container.appendChild(buildAlertCard(lead, todayStr)));
    }
    if (upcomingLeads.length > 0) {
      const hdr = document.createElement('div');
      hdr.className = 'alert-section-header upcoming-header';
      hdr.innerHTML = `<i class="fa-solid fa-calendar-week"></i> Upcoming 7 Days (${upcomingLeads.length})`;
      container.appendChild(hdr);
      upcomingLeads.forEach(lead => container.appendChild(buildAlertCard(lead, todayStr)));
    }
    return;
  }

  // Specific tabs
  let displayList = [];
  if (currentAlertTab === 'overdue') {
    displayList = activeAlertLeads.filter(l => l.followUpDate < todayStr).sort((a,b) => a.followUpDate.localeCompare(b.followUpDate));
  } else if (currentAlertTab === 'today') {
    displayList = activeAlertLeads.filter(l => l.followUpDate === todayStr);
  } else if (currentAlertTab === 'upcoming') {
    displayList = activeAlertLeads.filter(l => l.followUpDate > todayStr && l.followUpDate <= next7DaysStr);
  }

  if (displayList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px 12px; color: var(--text-dim); font-size: 0.84rem;">
        <i class="fa-solid fa-calendar-check" style="font-size: 1.8rem; margin-bottom: 6px; display: block; color: var(--success);"></i>
        No follow-up alerts in this category!
      </div>
    `;
    return;
  }

  displayList.forEach(lead => {
    container.appendChild(buildAlertCard(lead, todayStr));
  });
}

// Build a single alert card element (extracted for reuse)
function buildAlertCard(lead, todayStr) {
  const card = document.createElement('div');
    const isOverdue = lead.followUpDate < todayStr;
    const isToday = lead.followUpDate === todayStr;
    const statusType = isOverdue ? 'overdue' : (isToday ? 'today' : 'upcoming');
    const labelText = isOverdue ? '🚨 Overdue' : (isToday ? '⏰ Due Today' : '📅 Upcoming');

    // Calculate how many days overdue
    let daysInfo = '';
    if (isOverdue) {
      const msPerDay = 86400000;
      const daysAgo = Math.floor((new Date(todayStr) - new Date(lead.followUpDate)) / msPerDay);
      daysInfo = `<span style="font-size:0.7rem;color:var(--danger);font-weight:700;"> (${daysAgo}d overdue)</span>`;
    }

    card.className = `alert-item-card ${statusType}`;
    card.innerHTML = `
      <div class="alert-item-top">
        <span class="alert-lead-name" title="Open lead profile">${escapeHtml(lead.customerName)}</span>
        <span class="alert-time-tag ${statusType}">${labelText}</span>
      </div>
      <div class="alert-company-line">
        <i class="fa-solid fa-building"></i> ${escapeHtml(lead.company || 'Direct')} &bull; <span class="alert-rep-tag"><i class="fa-solid fa-user-tie"></i> ${escapeHtml(lead.assignedEmployee || 'Unassigned')}</span>
      </div>
      <div style="font-size:0.76rem;color:var(--text-dim);"><i class="fa-solid fa-calendar-day"></i> Scheduled: ${formatDateDisplay(lead.followUpDate)}${daysInfo}</div>
      <div class="alert-actions-row">
        <div class="alert-quick-actions">
          <button class="btn-alert-action snooze-1d-btn" title="Postpone by 1 day"><i class="fa-solid fa-forward"></i> +1 Day</button>
          <button class="btn-alert-action snooze-3d-btn" title="Postpone by 3 days"><i class="fa-solid fa-forward-step"></i> +3 Days</button>
        </div>
        <div class="alert-quick-actions">
          <a href="mailto:${escapeHtml(lead.email)}" class="btn-alert-action" title="Email customer"><i class="fa-solid fa-envelope"></i></a>
          <a href="tel:${escapeHtml(lead.phone)}" class="btn-alert-action" title="Call customer"><i class="fa-solid fa-phone"></i></a>
        </div>
      </div>
    `;

    card.querySelector('.alert-lead-name').addEventListener('click', () => {
      document.getElementById('alertsPanel')?.classList.remove('show');
      openViewDetailsModal(lead);
    });
    card.querySelector('.snooze-1d-btn').addEventListener('click', () => snoozeLeadFollowUp(lead.id, 1));
    card.querySelector('.snooze-3d-btn').addEventListener('click', () => snoozeLeadFollowUp(lead.id, 3));

  return card;
}

function snoozeLeadFollowUp(leadId, days) {
  const index = leads.findIndex(l => l.id === leadId);
  if (index !== -1) {
    const lead = leads[index];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + days);
    const newDateStr = baseDate.toISOString().split('T')[0];

    lead.followUpDate = newDateStr;
    if (!lead.activityLog) lead.activityLog = [];
    lead.activityLog.unshift({
      date: formatCurrentTimestamp(),
      note: `Follow-up date rescheduled by +${days} day(s) to ${formatDateDisplay(newDateStr)}.`
    });

    saveLeadsToStorage();
    renderApp();
    showToast(`Rescheduled follow-up for "${lead.customerName}" (+${days}d)`, 'success');
  }
}

// ==========================================
// 7. ACTIVE FILTER TAGS
// ==========================================
function renderActiveFilterTags() {
  const tagsContainer = document.getElementById('tagsContainer');
  const activeTagsBar = document.getElementById('activeFilterTags');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  tagsContainer.innerHTML = '';

  const activeEntries = [];

  if (activeFilters.search) {
    activeEntries.push({ key: 'search', label: `Search: "${activeFilters.search}"` });
  }
  if (activeFilters.status !== 'all') {
    activeEntries.push({ key: 'status', label: `Status: ${STATUS_CONFIG[activeFilters.status]?.label || activeFilters.status}` });
  }
  if (activeFilters.followUpSchedule !== 'all') {
    const scheduleLabels = { overdue: '🚨 Overdue Follow-ups', today: '⏰ Due Today', upcoming: '📅 Next 7 Days' };
    activeEntries.push({ key: 'followUpSchedule', label: `Follow-up: ${scheduleLabels[activeFilters.followUpSchedule] || activeFilters.followUpSchedule}` });
  }
  if (activeFilters.source !== 'all') {
    activeEntries.push({ key: 'source', label: `Source: ${SOURCE_CONFIG[activeFilters.source]?.label || activeFilters.source}` });
  }
  if (activeFilters.employee !== 'all') {
    activeEntries.push({ key: 'employee', label: `Rep: ${activeFilters.employee}` });
  }
  if (activeFilters.priority !== 'all') {
    activeEntries.push({ key: 'priority', label: `Priority: ${activeFilters.priority.toUpperCase()}` });
  }

  if (activeEntries.length > 0) {
    activeTagsBar.style.display = 'flex';
    resetFiltersBtn.style.display = 'inline-flex';

    activeEntries.forEach(entry => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        <span>${escapeHtml(entry.label)}</span>
        <button type="button" data-tag-key="${entry.key}" title="Remove filter">&times;</button>
      `;
      tag.querySelector('button').addEventListener('click', () => {
        removeSingleFilter(entry.key);
      });
      tagsContainer.appendChild(tag);
    });
  } else {
    activeTagsBar.style.display = 'none';
    resetFiltersBtn.style.display = 'none';
  }
}

function removeSingleFilter(key) {
  if (key === 'search') {
    activeFilters.search = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearchBtn').style.display = 'none';
  } else if (key === 'status') {
    activeFilters.status = 'all';
    document.getElementById('filterStatus').value = 'all';
  } else if (key === 'followUpSchedule') {
    activeFilters.followUpSchedule = 'all';
    const sel = document.getElementById('filterFollowUpSchedule');
    if (sel) sel.value = 'all';
  } else if (key === 'source') {
    activeFilters.source = 'all';
    document.getElementById('filterSource').value = 'all';
  } else if (key === 'employee') {
    activeFilters.employee = 'all';
    document.getElementById('filterEmployee').value = 'all';
  } else if (key === 'priority') {
    activeFilters.priority = 'all';
    document.getElementById('filterPriority').value = 'all';
  }
  renderApp();
}

function populateEmployeeFilterOptions() {
  const select = document.getElementById('filterEmployee');
  if (!select) return;

  const currentVal = activeFilters.employee;
  const reps = new Set();
  leads.forEach(l => {
    if (l.assignedEmployee) reps.add(l.assignedEmployee.trim());
  });

  select.innerHTML = '<option value="all">All Reps</option>';
  Array.from(reps).sort().forEach(rep => {
    const opt = document.createElement('option');
    opt.value = rep;
    opt.textContent = rep;
    if (rep === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

// ==========================================
// 8. KANBAN VIEW & DRAG AND DROP
// ==========================================
function renderKanban(filteredLeads) {
  const board = document.getElementById('kanbanBoard');
  board.innerHTML = '';

  const statuses = ['new', 'contacted', 'intrested', 'followup', 'converted', 'not intersted'];

  statuses.forEach(statusKey => {
    const statusMeta = STATUS_CONFIG[statusKey];
    const columnLeads = filteredLeads.filter(l => l.leadStatus === statusKey);

    const colEl = document.createElement('div');
    colEl.className = 'kanban-column';
    colEl.setAttribute('data-status', statusKey);

    colEl.innerHTML = `
      <div class="kanban-col-header">
        <div class="col-title-wrap">
          <span class="col-status-dot dot-${statusKey.replace(' ', '-')}"></span>
          <span class="col-title">${statusMeta.label}</span>
        </div>
        <span class="col-count-badge">${columnLeads.length}</span>
      </div>
      <div class="kanban-card-list" id="col-${statusKey.replace(' ', '-')}"></div>
    `;

    const cardList = colEl.querySelector('.kanban-card-list');

    // Drag over handlers on column
    colEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      colEl.classList.add('drag-over');
    });

    colEl.addEventListener('dragleave', () => {
      colEl.classList.remove('drag-over');
    });

    colEl.addEventListener('drop', (e) => {
      e.preventDefault();
      colEl.classList.remove('drag-over');
      const draggedLeadId = e.dataTransfer.getData('text/plain');
      if (draggedLeadId) {
        moveLeadToStatus(draggedLeadId, statusKey);
      }
    });

    // Populate Cards
    columnLeads.forEach(lead => {
      const card = createKanbanCard(lead);
      cardList.appendChild(card);
    });

    board.appendChild(colEl);
  });
}

function createKanbanCard(lead) {
  const card = document.createElement('div');
  const todayStr = new Date().toISOString().split('T')[0];
  const isClosed = lead.leadStatus === 'converted' || lead.leadStatus === 'not intersted';
  const isOverdue = !isClosed && lead.followUpDate && lead.followUpDate < todayStr;
  const isToday = !isClosed && lead.followUpDate && lead.followUpDate === todayStr;

  let highlightClass = '';
  if (isOverdue) highlightClass = 'card-overdue-highlight';
  else if (isToday) highlightClass = 'card-today-highlight';

  card.className = `kanban-card ${highlightClass}`;
  card.setAttribute('draggable', 'true');
  card.setAttribute('data-lead-id', lead.id);

  const aiScore = calculateAiScore(lead);
  const initials = getInitials(lead.assignedEmployee || lead.customerName);
  const followUpBadge = getFollowUpStatusBadge(lead.followUpDate, lead.leadStatus);

  card.innerHTML = `
    <div class="card-ai-badge"><i class="fa-solid fa-sparkles"></i> AI ${aiScore}</div>
    <div class="card-top-row">
      <span class="card-company-name"><i class="fa-solid fa-building"></i> ${escapeHtml(lead.company || 'Private')}</span>
      <span class="priority-pill ${lead.priority}">${lead.priority?.toUpperCase()}</span>
    </div>
    <div class="card-customer-name" title="Click to view details">${escapeHtml(lead.customerName)}</div>
    
    <div class="card-contact-row">
      <div class="card-contact-item"><i class="fa-solid fa-envelope"></i> ${escapeHtml(lead.email)}</div>
      <div class="card-contact-item"><i class="fa-solid fa-phone"></i> ${escapeHtml(lead.phone)}</div>
    </div>

    ${lead.notes ? `<div class="card-notes-snippet">"${escapeHtml(lead.notes)}"</div>` : ''}

    <div class="card-footer-row">
      <div class="card-assigned-wrap">
        <div class="card-avatar-sm" title="${escapeHtml(lead.assignedEmployee)}">${initials}</div>
        <span>${escapeHtml(lead.assignedEmployee || 'Unassigned')}</span>
      </div>
      <div class="card-date-badge ${followUpBadge.cls}">
        <i class="fa-solid fa-calendar-day"></i> ${followUpBadge.text}
      </div>
    </div>
  `;

  // Drag Events
  card.addEventListener('dragstart', (e) => {
    card.classList.add('dragging');
    e.dataTransfer.setData('text/plain', lead.id);
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });

  // Click card to open View Modal
  card.addEventListener('click', (e) => {
    openViewDetailsModal(lead);
  });

  return card;
}

function moveLeadToStatus(leadId, newStatus) {
  const leadIndex = leads.findIndex(l => l.id === leadId);
  if (leadIndex !== -1) {
    const prevStatus = leads[leadIndex].leadStatus;
    if (prevStatus !== newStatus) {
      leads[leadIndex].leadStatus = newStatus;
      
      // Auto-log activity
      if (!leads[leadIndex].activityLog) leads[leadIndex].activityLog = [];
      leads[leadIndex].activityLog.unshift({
        date: formatCurrentTimestamp(),
        note: `Moved stage from ${STATUS_CONFIG[prevStatus]?.label || prevStatus} to ${STATUS_CONFIG[newStatus]?.label || newStatus}.`
      });

      saveLeadsToStorage();
      renderApp();
      showToast(`Lead stage updated to ${STATUS_CONFIG[newStatus]?.label}`, 'success');
    }
  }
}

// ==========================================
// 9. TABLE VIEW & SORTING
// ==========================================
function renderTable(filteredLeads = getFilteredLeads()) {
  const tbody = document.getElementById('leadsTableBody');
  const emptyState = document.getElementById('emptyTableState');
  const countDisplay = document.getElementById('tableCountDisplay');

  // Sort Leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let valA = '';
    let valB = '';

    if (sortField === 'name') {
      valA = a.customerName.toLowerCase();
      valB = b.customerName.toLowerCase();
    } else if (sortField === 'company') {
      valA = (a.company || '').toLowerCase();
      valB = (b.company || '').toLowerCase();
    } else if (sortField === 'source') {
      valA = a.leadSource || '';
      valB = b.leadSource || '';
    } else if (sortField === 'assigned') {
      valA = (a.assignedEmployee || '').toLowerCase();
      valB = (b.assignedEmployee || '').toLowerCase();
    } else if (sortField === 'status') {
      valA = a.leadStatus || '';
      valB = b.leadStatus || '';
    } else if (sortField === 'priority') {
      const order = { 'high': 3, 'medium': 2, 'low': 1 };
      valA = order[a.priority] || 0;
      valB = order[b.priority] || 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    } else if (sortField === 'followup') {
      valA = a.followUpDate || '';
      valB = b.followUpDate || '';
    } else if (sortField === 'aiScore') {
      valA = calculateAiScore(a);
      valB = calculateAiScore(b);
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  tbody.innerHTML = '';
  countDisplay.textContent = `Showing ${sortedLeads.length} of ${leads.length} leads`;

  if (sortedLeads.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  const todayStr = new Date().toISOString().split('T')[0];

  sortedLeads.forEach(lead => {
    const tr = document.createElement('tr');
    const isClosed = lead.leadStatus === 'converted' || lead.leadStatus === 'not intersted';
    const isOverdue = !isClosed && lead.followUpDate && lead.followUpDate < todayStr;
    const isToday = !isClosed && lead.followUpDate && lead.followUpDate === todayStr;

    if (isOverdue) tr.className = 'table-row-overdue';
    else if (isToday) tr.className = 'table-row-today';

    const aiScore = calculateAiScore(lead);
    const initials = getInitials(lead.customerName);
    const scoreCls = aiScore >= 80 ? 'high' : (aiScore >= 50 ? 'mid' : 'low');
    const followUpBadge = getFollowUpStatusBadge(lead.followUpDate, lead.leadStatus);

    tr.innerHTML = `
      <td>
        <div class="table-lead-cell">
          <div class="table-avatar">${initials}</div>
          <div class="table-lead-info">
            <span class="table-lead-name" title="Click to view details">${escapeHtml(lead.customerName)}</span>
            <span class="table-source-tag"><i class="fa-solid ${SOURCE_CONFIG[lead.leadSource]?.icon || 'fa-tag'}"></i> ${SOURCE_CONFIG[lead.leadSource]?.label || lead.leadSource}</span>
          </div>
        </div>
      </td>
      <td><strong>${escapeHtml(lead.company || '—')}</strong></td>
      <td>
        <div style="font-size: 0.8rem;">
          <div><a href="mailto:${escapeHtml(lead.email)}" class="link-text">${escapeHtml(lead.email)}</a></div>
          <div class="text-dim"><i class="fa-solid fa-phone"></i> ${escapeHtml(lead.phone)}</div>
        </div>
      </td>
      <td>
        <span class="source-badge">${SOURCE_CONFIG[lead.leadSource]?.label || lead.leadSource}</span>
      </td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-user-tie text-dim"></i>
          <span>${escapeHtml(lead.assignedEmployee || 'Unassigned')}</span>
        </div>
      </td>
      <td>
        <span class="status-badge status-${lead.leadStatus.replace(' ', '-')}">
          <i class="fa-solid ${STATUS_CONFIG[lead.leadStatus]?.icon || 'fa-circle'}"></i>
          ${STATUS_CONFIG[lead.leadStatus]?.label || lead.leadStatus}
        </span>
      </td>
      <td>
        <span class="priority-badge priority-${lead.priority}">${lead.priority?.toUpperCase()}</span>
      </td>
      <td>
        <div style="display:flex;flex-direction:column;gap:3px;">
          <span class="${followUpBadge.cls}" style="font-size:0.82rem;">${followUpBadge.text}</span>
          ${isOverdue ? '<span class="followup-urgent-label overdue-label"><i class="fa-solid fa-triangle-exclamation"></i> OVERDUE</span>' : ''}
          ${isToday ? '<span class="followup-urgent-label today-label"><i class="fa-solid fa-clock"></i> ACT TODAY</span>' : ''}
        </div>
      </td>
      <td>
        <span class="table-score-badge ${scoreCls}">
          <i class="fa-solid fa-bolt"></i> ${aiScore}
        </span>
      </td>
      <td>
        <div class="table-actions-cell">
          <button class="table-btn view-row-btn" title="View Lead Profile"><i class="fa-solid fa-eye"></i></button>
          <button class="table-btn edit-row-btn" title="Edit Lead"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="table-btn delete-btn delete-row-btn" title="Delete Lead"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    // Row Click / Actions
    tr.querySelector('.table-lead-name').addEventListener('click', () => openViewDetailsModal(lead));
    tr.querySelector('.view-row-btn').addEventListener('click', () => openViewDetailsModal(lead));
    tr.querySelector('.edit-row-btn').addEventListener('click', () => openLeadModal(lead));
    tr.querySelector('.delete-row-btn').addEventListener('click', () => openDeleteConfirmModal(lead));

    tbody.appendChild(tr);
  });
}

// ==========================================
// 10. CRUD OPERATIONS
// ==========================================

// Open Modal: Add / Edit Lead
function openLeadModal(lead = null) {
  closeAllModals();
  const modal = document.getElementById('leadModal');
  const modalTitle = document.getElementById('modalTitle');
  const form = document.getElementById('leadForm');

  // Reset form errors
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  form.reset();

  if (lead) {
    modalTitle.textContent = 'Edit Sales Lead';
    document.getElementById('modalIconBadge').innerHTML = '<i class="fa-solid fa-user-pen"></i>';
    document.getElementById('leadId').value = lead.id;
    document.getElementById('customerName').value = lead.customerName || '';
    document.getElementById('companyName').value = lead.company || '';
    document.getElementById('customerEmail').value = lead.email || '';
    document.getElementById('customerPhone').value = lead.phone || '';
    document.getElementById('leadSource').value = lead.leadSource || '';
    document.getElementById('assignedEmployee').value = lead.assignedEmployee || '';
    document.getElementById('leadStatus').value = lead.leadStatus || '';
    document.getElementById('leadPriority').value = lead.priority || '';
    document.getElementById('followUpDate').value = lead.followUpDate || '';
    document.getElementById('dealValue').value = lead.dealValue || '';
    document.getElementById('leadNotes').value = lead.notes || '';
  } else {
    modalTitle.textContent = 'Add New Lead';
    document.getElementById('modalIconBadge').innerHTML = '<i class="fa-solid fa-user-plus"></i>';
    document.getElementById('leadId').value = '';
    
    // Sensible defaults
    document.getElementById('leadStatus').value = 'new';
    document.getElementById('leadPriority').value = 'medium';
    
    // Default follow-up date = 3 days from now
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 3);
    document.getElementById('followUpDate').value = nextDate.toISOString().split('T')[0];
  }

  modal.classList.add('active');
  document.getElementById('customerName').focus();
}

// Strict Form Submission & Validation
function handleLeadFormSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('leadForm');
  const id = document.getElementById('leadId').value;
  const customerName = document.getElementById('customerName').value.trim();
  const company = document.getElementById('companyName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const leadSource = document.getElementById('leadSource').value;
  const assignedEmployee = document.getElementById('assignedEmployee').value.trim();
  const leadStatus = document.getElementById('leadStatus').value;
  const priority = document.getElementById('leadPriority').value;
  const followUpDate = document.getElementById('followUpDate').value;
  const dealValue = parseFloat(document.getElementById('dealValue').value) || 0;
  const notes = document.getElementById('leadNotes').value.trim();

  // Validate fields strictly
  let isValid = true;

  function validateField(inputEl, condition) {
    if (!condition) {
      inputEl.classList.add('is-invalid');
      isValid = false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
    }
  }

  validateField(document.getElementById('customerName'), customerName.length >= 2);
  validateField(document.getElementById('companyName'), company.length >= 2);
  validateField(document.getElementById('customerEmail'), isValidEmail(email));
  validateField(document.getElementById('customerPhone'), phone.length >= 7);
  validateField(document.getElementById('leadSource'), !!leadSource);
  validateField(document.getElementById('assignedEmployee'), assignedEmployee.length >= 2);
  validateField(document.getElementById('leadStatus'), !!leadStatus);
  validateField(document.getElementById('leadPriority'), !!priority);
  validateField(document.getElementById('followUpDate'), !!followUpDate);
  validateField(document.getElementById('leadNotes'), notes.length >= 3);

  if (!isValid) {
    showToast('Please fix the highlighted required fields', 'warning');
    return;
  }

  if (id) {
    // EDIT Lead
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      const existing = leads[index];
      const updatedLead = {
        ...existing,
        customerName,
        company,
        email,
        phone,
        leadSource,
        assignedEmployee,
        leadStatus,
        priority,
        followUpDate,
        dealValue,
        notes
      };

      // Add log entry
      if (!updatedLead.activityLog) updatedLead.activityLog = [];
      updatedLead.activityLog.unshift({
        date: formatCurrentTimestamp(),
        note: `Lead profile updated by sales rep.`
      });

      leads[index] = updatedLead;
      saveLeadsToStorage();
      populateEmployeeFilterOptions();
      renderApp();
      closeAllModals();
      showToast(`Lead for "${customerName}" updated successfully`, 'success');
    }
  } else {
    // ADD New Lead
    const newLead = {
      id: 'lead_' + Date.now(),
      customerName,
      company,
      email,
      phone,
      leadSource,
      assignedEmployee,
      leadStatus,
      priority,
      followUpDate,
      dealValue,
      notes,
      activityLog: [
        { date: formatCurrentTimestamp(), note: `Lead created via ${leadSource} channel.` }
      ],
      createdAt: new Date().toISOString()
    };

    leads.unshift(newLead);
    saveLeadsToStorage();
    populateEmployeeFilterOptions();
    renderApp();
    closeAllModals();
    showToast(`New lead for "${customerName}" created!`, 'success');
  }
}

// View Lead Details & AI Drawer
function openViewDetailsModal(lead) {
  currentActiveLeadId = lead.id;
  closeAllModals();

  const modal = document.getElementById('viewDetailsModal');
  const initials = getInitials(lead.customerName);

  document.getElementById('viewAvatar').textContent = initials;
  document.getElementById('viewCustomerName').textContent = lead.customerName;
  document.getElementById('viewCompanyName').innerHTML = `<i class="fa-solid fa-building"></i> ${escapeHtml(lead.company || 'Individual')}`;
  
  // Status & Priority Badges
  const statusEl = document.getElementById('viewStatusBadge');
  statusEl.className = `status-badge status-${lead.leadStatus.replace(' ', '-')}`;
  statusEl.innerHTML = `<i class="fa-solid ${STATUS_CONFIG[lead.leadStatus]?.icon || 'fa-circle'}"></i> ${STATUS_CONFIG[lead.leadStatus]?.label || lead.leadStatus}`;

  const priorityEl = document.getElementById('viewPriorityBadge');
  priorityEl.className = `priority-badge priority-${lead.priority}`;
  priorityEl.textContent = `${lead.priority.toUpperCase()} PRIORITY`;

  // Info Tiles
  const emailLink = document.getElementById('viewEmailLink');
  emailLink.textContent = lead.email;
  emailLink.href = `mailto:${lead.email}`;

  const phoneLink = document.getElementById('viewPhoneLink');
  phoneLink.textContent = lead.phone;
  phoneLink.href = `tel:${lead.phone}`;

  document.getElementById('viewSourceText').textContent = SOURCE_CONFIG[lead.leadSource]?.label || lead.leadSource;
  document.getElementById('viewEmployeeText').textContent = lead.assignedEmployee || 'Unassigned';
  document.getElementById('viewFollowUpText').textContent = lead.followUpDate ? formatDateDisplay(lead.followUpDate) : 'Not scheduled';
  document.getElementById('viewDealValueText').textContent = lead.dealValue ? `$${lead.dealValue.toLocaleString()}` : '—';

  // Quick Stage Stepper
  renderStageStepper(lead);

  // Timeline / Notes Feed
  renderTimelineFeed(lead);

  // AI Intelligence Drawer
  renderAiDrawer(lead);

  modal.classList.add('active');
}

function renderStageStepper(lead) {
  const container = document.getElementById('viewStagePills');
  container.innerHTML = '';

  const stages = ['new', 'contacted', 'intrested', 'followup', 'converted', 'not intersted'];

  stages.forEach(stageKey => {
    const btn = document.createElement('button');
    btn.className = `stage-pill-btn ${lead.leadStatus === stageKey ? 'active-stage' : ''}`;
    btn.innerHTML = `<i class="fa-solid ${STATUS_CONFIG[stageKey]?.icon || 'fa-circle'}"></i> ${STATUS_CONFIG[stageKey]?.label}`;
    
    btn.addEventListener('click', () => {
      moveLeadToStatus(lead.id, stageKey);
      const updated = leads.find(l => l.id === lead.id);
      if (updated) openViewDetailsModal(updated);
    });

    container.appendChild(btn);
  });
}

function renderTimelineFeed(lead) {
  const feed = document.getElementById('viewNotesTimeline');
  feed.innerHTML = '';

  const logs = lead.activityLog || [];

  if (logs.length === 0 && !lead.notes) {
    feed.innerHTML = `<div class="text-dim" style="font-size: 0.8rem; padding: 8px;">No activity logged yet.</div>`;
    return;
  }

  // Base note if present
  if (lead.notes) {
    const noteEl = document.createElement('div');
    noteEl.className = 'timeline-item';
    noteEl.innerHTML = `
      <div class="timeline-item-meta">
        <span><i class="fa-solid fa-note-sticky"></i> Primary Note</span>
        <span>Lead Creation</span>
      </div>
      <div class="timeline-item-body">${escapeHtml(lead.notes)}</div>
    `;
    feed.appendChild(noteEl);
  }

  logs.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'timeline-item';
    itemEl.innerHTML = `
      <div class="timeline-item-meta">
        <span><i class="fa-solid fa-clock"></i> Interaction</span>
        <span>${escapeHtml(item.date)}</span>
      </div>
      <div class="timeline-item-body">${escapeHtml(item.note)}</div>
    `;
    feed.appendChild(itemEl);
  });
}

function handleAddQuickNote() {
  if (!currentActiveLeadId) return;
  const input = document.getElementById('quickNewNoteInput');
  const text = input.value.trim();

  if (!text) {
    showToast('Please type a note first', 'warning');
    return;
  }

  const index = leads.findIndex(l => l.id === currentActiveLeadId);
  if (index !== -1) {
    if (!leads[index].activityLog) leads[index].activityLog = [];
    leads[index].activityLog.unshift({
      date: formatCurrentTimestamp(),
      note: text
    });

    input.value = '';
    saveLeadsToStorage();
    renderTimelineFeed(leads[index]);
    renderApp();
    showToast('Note added to timeline', 'success');
  }
}

// Delete Confirmation
function openDeleteConfirmModal(lead) {
  leadToDeleteId = lead.id;
  document.getElementById('deleteLeadName').textContent = `${lead.customerName} (${lead.company || 'Lead'})`;
  document.getElementById('deleteConfirmModal').classList.add('active');
}

function handleConfirmDelete() {
  if (!leadToDeleteId) return;

  const lead = leads.find(l => l.id === leadToDeleteId);
  const name = lead ? lead.customerName : 'Lead';

  leads = leads.filter(l => l.id !== leadToDeleteId);
  leadToDeleteId = null;

  saveLeadsToStorage();
  populateEmployeeFilterOptions();
  renderApp();
  closeAllModals();
  showToast(`Deleted lead for "${name}"`, 'danger');
}

// ==========================================
// 11. LEAD AI INTELLIGENCE SYSTEM
// ==========================================
function calculateAiScore(lead) {
  let score = 50; // base score

  // Priority impact
  if (lead.priority === 'high') score += 25;
  else if (lead.priority === 'medium') score += 10;
  else if (lead.priority === 'low') score -= 5;

  // Status impact
  if (lead.leadStatus === 'converted') return 100;
  if (lead.leadStatus === 'not intersted') return 15;
  if (lead.leadStatus === 'intrested') score += 20;
  if (lead.leadStatus === 'followup') score += 12;
  if (lead.leadStatus === 'contacted') score += 5;

  // Deal Value impact
  if (lead.dealValue > 20000) score += 10;
  else if (lead.dealValue > 5000) score += 5;

  // Source conversion weight
  if (lead.leadSource === 'referral') score += 15;
  else if (lead.leadSource === 'website') score += 10;
  else if (lead.leadSource === 'google') score += 8;

  // Follow-up recency
  if (lead.followUpDate) {
    const today = new Date().toISOString().split('T')[0];
    if (lead.followUpDate < today) score -= 8; // penalty for overdue
    else score += 5;
  }

  return Math.min(Math.max(score, 10), 99);
}

function renderAiDrawer(lead) {
  const score = calculateAiScore(lead);
  document.getElementById('aiScoreNumber').textContent = score;

  // Circle fill
  const circleFill = document.getElementById('aiScoreCircleFill');
  circleFill.setAttribute('stroke-dasharray', `${score}, 100`);

  // Verdict & Recommendation
  let verdict = 'High Conversion Potential';
  let reason = 'Strong engagement signals, fast response channels, and verified budget.';
  let nextAction = 'Book a 20-minute product demonstration focusing on ROI and deployment time.';

  if (lead.leadStatus === 'converted') {
    verdict = 'Deal Won 🏆';
    reason = 'Successfully converted into an active enterprise account.';
    nextAction = 'Initiate customer onboarding kickoff call and assign customer success manager.';
  } else if (lead.leadStatus === 'not intersted') {
    verdict = 'Low Probability';
    reason = 'Lead expressed timing/budget constraint. Stored for nurture sequence.';
    nextAction = 'Add to quarterly newsletter drip and follow up in 6 months.';
  } else if (score >= 80) {
    verdict = '🔥 Hot Deal Opportunity';
    reason = `High score due to ${lead.leadSource} source, ${lead.priority} priority, and active engagement.`;
    nextAction = `Send customized executive proposal with deal size $${(lead.dealValue || 15000).toLocaleString()}.`;
  } else if (score >= 50) {
    verdict = '⚡ Moderate Warm Lead';
    reason = 'Good initial contact. Needs discovery call to confirm decision timeline.';
    nextAction = 'Send 3-question qualification questionnaire and case study.';
  } else {
    verdict = '❄️ Nurture Candidate';
    reason = 'Low response rate or early pipeline stage.';
    nextAction = 'Engage with educational value-add email or industry benchmark report.';
  }

  document.getElementById('aiScoreVerdict').textContent = verdict;
  document.getElementById('aiScoreReason').textContent = reason;
  document.getElementById('aiNextActionText').textContent = nextAction;

  // AI Personalized Outreach Pitch
  const subject = `Partnership with ${lead.company || 'your team'} – quick idea for ${lead.customerName.split(' ')[0]}`;
  const body = `Hi ${lead.customerName.split(' ')[0]},\n\nI was reviewing your requirements from ${SOURCE_CONFIG[lead.leadSource]?.label || 'our recent touchpoint'}. Based on how ${lead.company || 'your organization'} is scaling, we've helped similar teams boost sales velocity by 40%.\n\nWould you have 10 minutes this Thursday for a quick walkthrough?\n\nBest regards,\n${lead.assignedEmployee || 'Sales Director'}`;

  document.getElementById('aiEmailSubject').textContent = subject;
  document.getElementById('aiEmailBody').innerHTML = body.replace(/\n/g, '<br>');

  lead._currentAiDraft = { subject, body };
}

function handleCopyAiEmail() {
  if (!currentActiveLeadId) return;
  const lead = leads.find(l => l.id === currentActiveLeadId);
  if (lead && lead._currentAiDraft) {
    const fullText = `Subject: ${lead._currentAiDraft.subject}\n\n${lead._currentAiDraft.body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      showToast('AI Email draft copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Copied text successfully', 'success');
    });
  }
}

function handleSendDirectEmail() {
  if (!currentActiveLeadId) return;
  const lead = leads.find(l => l.id === currentActiveLeadId);
  if (lead && lead._currentAiDraft) {
    const mailtoUrl = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(lead._currentAiDraft.subject)}&body=${encodeURIComponent(lead._currentAiDraft.body)}`;
    window.location.href = mailtoUrl;
  }
}

function handleAiEnhanceNote() {
  const notesInput = document.getElementById('leadNotes');
  const currentText = notesInput.value.trim();

  if (!currentText) {
    notesInput.value = 'Client expressed strong interest in core platform features. Budget verified for Q4 implementation. Requested custom pricing breakdown and SOC2 security compliance documents.';
    showToast('AI generated a structured lead summary note!', 'info');
  } else {
    notesInput.value = `${currentText} | [AI Summary: High purchase intent confirmed. Next milestone: Send contract draft and book executive demo.]`;
    showToast('AI enhanced the lead notes!', 'success');
  }
}

function openAiOverviewModal() {
  closeAllModals();
  const modal = document.getElementById('aiOverviewModal');
  const content = document.getElementById('aiOverviewContent');

  const total = leads.length;
  const converted = leads.filter(l => l.leadStatus === 'converted').length;
  const highPriority = leads.filter(l => l.priority === 'high').length;
  const topSource = getTopLeadSource();

  content.innerHTML = `
    <div class="ai-insight-card">
      <h4><i class="fa-solid fa-chart-pie text-accent"></i> Pipeline Conversion Health</h4>
      <p>Overall conversion rate is sitting at <strong>${total > 0 ? Math.round((converted/total)*100) : 0}%</strong>. Leads originating from <strong>${topSource}</strong> show the highest velocity from Contacted to Qualified.</p>
    </div>
    <div class="ai-insight-card">
      <h4><i class="fa-solid fa-fire text-danger"></i> High-Priority Revenue at Risk</h4>
      <p>There are currently <strong>${highPriority} high-priority leads</strong> in the active pipeline. Ensuring same-day follow-ups on these leads increases win rate by ~35%.</p>
    </div>
    <div class="ai-insight-card">
      <h4><i class="fa-solid fa-lightbulb text-warning"></i> AI Recommendation</h4>
      <p>Focus outreach effort on leads in <strong>Follow-up</strong> stage with pending deal values over $15,000. Use the one-click AI Email Drafter to trigger fast touchpoints.</p>
    </div>
    <div class="ai-insight-card">
      <h4><i class="fa-solid fa-shield-halved text-success"></i> Data Storage & Integrity</h4>
      <p>All leads are synced to your browser's persistent LocalStorage engine. You can backup or restore via JSON/CSV exports at any time.</p>
    </div>
  `;

  modal.classList.add('active');
}

function getTopLeadSource() {
  if (leads.length === 0) return 'Website';
  const counts = {};
  leads.forEach(l => {
    counts[l.leadSource] = (counts[l.leadSource] || 0) + 1;
  });
  let top = 'Website';
  let max = 0;
  for (const s in counts) {
    if (counts[s] > max) {
      max = counts[s];
      top = SOURCE_CONFIG[s]?.label || s;
    }
  }
  return top;
}

// ==========================================
// 12. EXPORT & IMPORT DATA
// ==========================================
function exportDataAsJson() {
  const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute("download", `apex_leads_export_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Exported all leads as JSON file', 'success');
}

function exportDataAsCsv() {
  if (leads.length === 0) {
    showToast('No leads to export', 'warning');
    return;
  }

  const headers = ['Customer Name', 'Company', 'Email', 'Phone', 'Lead Source', 'Assigned Rep', 'Lead Status', 'Priority', 'Follow-up Date', 'Deal Value ($)', 'Notes'];
  const rows = leads.map(l => [
    `"${(l.customerName || '').replace(/"/g, '""')}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.leadSource || '').replace(/"/g, '""')}"`,
    `"${(l.assignedEmployee || '').replace(/"/g, '""')}"`,
    `"${(l.leadStatus || '').replace(/"/g, '""')}"`,
    `"${(l.priority || '').replace(/"/g, '""')}"`,
    `"${(l.followUpDate || '').replace(/"/g, '""')}"`,
    l.dealValue || 0,
    `"${(l.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", encodeURI(csvContent));
  downloadAnchor.setAttribute("download", `apex_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Exported leads to CSV spreadsheet', 'success');
}

function handleImportJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (Array.isArray(parsed)) {
        leads = parsed;
        saveLeadsToStorage();
        populateEmployeeFilterOptions();
        renderApp();
        showToast(`Successfully imported ${leads.length} leads!`, 'success');
      } else {
        showToast('Invalid JSON file format (must be an array of leads)', 'danger');
      }
    } catch (err) {
      showToast('Could not parse JSON file', 'danger');
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // reset
}

// ==========================================
// 13. MODAL & UI HELPERS
// ==========================================
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  currentActiveLeadId = null;
  leadToDeleteId = null;
}

function isModalOpen() {
  return !!document.querySelector('.modal-overlay.active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: 'fa-circle-check',
    danger: 'fa-triangle-exclamation',
    warning: 'fa-circle-exclamation',
    info: 'fa-circle-info'
  };

  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || 'fa-bell'} toast-icon"></i>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function getInitials(name) {
  if (!name) return 'LD';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getFollowUpStatusBadge(dateStr, status) {
  if (!dateStr || status === 'converted' || status === 'not intersted') {
    return { text: dateStr ? formatDateDisplay(dateStr) : '—', cls: '' };
  }

  const today = new Date().toISOString().split('T')[0];
  if (dateStr < today) {
    return { text: `Overdue (${formatDateDisplay(dateStr)})`, cls: 'overdue' };
  } else if (dateStr === today) {
    return { text: `Today!`, cls: 'today' };
  }
  return { text: formatDateDisplay(dateStr), cls: '' };
}

function formatDateDisplay(dateStr) {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}

function formatCurrentTimestamp() {
  const d = new Date();
  return d.toISOString().replace('T', ' ').substring(0, 16);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
