const listings = [
  {
    name: 'Oakwood Residency',
    price: '₹24,000',
    area: 'Gachibowli',
    beds: '2 BHK',
    size: '1,100 sq.ft.',
    deposit: '₹48,000',
    maintenance: '₹2,000 / mo',
    furnishing: 'Semi-furnished',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Palm Grove Villa',
    price: '₹38,000',
    area: 'Kondapur',
    beds: '3 BHK',
    size: '1,650 sq.ft.',
    deposit: '₹76,000',
    maintenance: '₹3,500 / mo',
    furnishing: 'Furnished',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Courtyard Home',
    price: '₹18,500',
    area: 'Miyapur',
    beds: '2 BHK',
    size: '980 sq.ft.',
    deposit: '₹37,000',
    maintenance: '₹1,500 / mo',
    furnishing: 'Unfurnished',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Lakeview Heights',
    price: '₹31,000',
    area: 'Madhapur',
    beds: '2 BHK',
    size: '1,250 sq.ft.',
    deposit: '₹62,000',
    maintenance: '₹2,500 / mo',
    furnishing: 'Semi-furnished',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Cedar Business Hub',
    price: '₹65,000',
    area: 'HITEC City',
    beds: 'Office',
    size: '1,900 sq.ft.',
    deposit: '₹130,000',
    maintenance: '₹6,000 / mo',
    furnishing: 'Fitted office',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Garden View Apartment',
    price: '₹21,000',
    area: 'Manikonda',
    beds: '2 BHK',
    size: '1,050 sq.ft.',
    deposit: '₹42,000',
    maintenance: '₹1,800 / mo',
    furnishing: 'Semi-furnished',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82'
  }
];

function addCompare(n) {
  let a = JSON.parse(localStorage.getItem('rscompare') || '[]');
  if (a.includes(n)) return alert('Property already added to comparison.');
  if (a.length >= 3) return alert('You can compare up to three properties at a time.');
  a.push(n);
  localStorage.setItem('rscompare', JSON.stringify(a));
  updateCompareBadges();
  alert('Added "' + n + '" to comparison.');
}

function removeCompare(name) {
  let a = JSON.parse(localStorage.getItem('rscompare') || '[]');
  a = a.filter(x => x !== name);
  localStorage.setItem('rscompare', JSON.stringify(a));
  renderCompare();
  updateCompareBadges();
}

function clearCompare() {
  localStorage.removeItem('rscompare');
  renderCompare();
  updateCompareBadges();
}

function loadSampleCompare() {
  localStorage.setItem('rscompare', JSON.stringify(['Oakwood Residency', 'Palm Grove Villa', 'Courtyard Home']));
  renderCompare();
  updateCompareBadges();
}

function updateCompareBadges() {
  const ns = JSON.parse(localStorage.getItem('rscompare') || '[]');
  document.querySelectorAll('.compare-badge-count').forEach(el => {
    el.textContent = ns.length > 0 ? ns.length : '';
    el.style.display = ns.length > 0 ? 'inline-block' : 'none';
  });
}

function renderCompare() {
  const el = document.getElementById('comparecontent');
  if (!el) return;
  const ns = JSON.parse(localStorage.getItem('rscompare') || '[]');
  updateCompareBadges();

  if (!ns.length) {
    el.innerHTML = `
      <div class="compare-empty">
        <h3>No properties selected</h3>
        <p>You can add up to 3 properties from search to compare them side by side, or load a sample comparison to see how it works.</p>
        <div class="actions">
          <a class="btn" href="search.html">Browse listings</a>
          <button class="outline" onclick="loadSampleCompare()">Load sample comparison</button>
        </div>
      </div>
    `;
    return;
  }

  const items = ns.map(n => listings.find(x => x.name === n) || {
    name: n,
    price: 'Contact',
    area: 'Hyderabad',
    beds: 'N/A',
    size: 'N/A',
    deposit: 'N/A',
    maintenance: 'N/A',
    furnishing: 'N/A',
    img: 'images/apartment.jpg'
  });

  const rows = [
    ['Monthly Rent', 'price'],
    ['Locality', 'area'],
    ['Bedrooms / Type', 'beds'],
    ['Built-up Area', 'size'],
    ['Security Deposit', 'deposit'],
    ['Maintenance', 'maintenance'],
    ['Furnishing', 'furnishing']
  ];

  let h = '<div class="comparewrap"><table class="comparetable">';
  h += '<tr><th style="min-width:140px">Property</th>';
  items.forEach(item => {
    h += `<td>
      <div class="compare-col-header">
        <img src="${item.img || 'images/apartment.jpg'}" alt="${item.name}">
        <b>${item.name}</b>
        <button class="remove-btn" onclick="removeCompare('${item.name.replace(/'/g, "\\'")}')">✕ Remove</button>
      </div>
    </td>`;
  });
  h += '</tr>';

  rows.forEach(([label, key]) => {
    h += `<tr><th>${label}</th>` + items.map(item => `<td>${item[key]}</td>`).join('') + '</tr>';
  });

  h += '<tr><th>Action</th>';
  items.forEach(() => {
    h += `<td><a class="btn" href="property.html" style="padding:8px 14px;font-size:12px">View details</a></td>`;
  });
  h += '</tr>';

  h += '</table></div>';
  h += `
    <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;align-items:center">
      <button class="outline" onclick="clearCompare()">Clear all comparison</button>
      <a class="btn" href="search.html" style="background:var(--g)">Add more properties (${3 - ns.length} slots left)</a>
    </div>
  `;
  el.innerHTML = h;
}

function updateListingPreview() {
  const title = document.getElementById('prop-title')?.value || '2 BHK apartment near metro';
  const price = document.getElementById('prop-price')?.value || '₹28,000';
  const locality = document.getElementById('prop-loc')?.value || 'Gachibowli, Hyderabad';
  const beds = document.getElementById('prop-beds')?.value || '2 BHK';
  const size = document.getElementById('prop-size')?.value || '1,200 sq.ft.';
  const furnishing = document.getElementById('prop-furnish')?.value || 'Semi-furnished';

  const previewTitle = document.getElementById('prev-title');
  const previewPrice = document.getElementById('prev-price');
  const previewLoc = document.getElementById('prev-loc');
  const previewMeta = document.getElementById('prev-meta');

  if (previewTitle) previewTitle.textContent = title;
  if (previewPrice) {
    const formattedPrice = price.startsWith('₹') ? price : '₹' + price;
    previewPrice.innerHTML = `${formattedPrice} <small>/ month</small>`;
  }
  if (previewLoc) previewLoc.textContent = locality;
  if (previewMeta) previewMeta.textContent = `${beds} · ${size} · ${furnishing}`;
}

function handlePhotoUpload(input) {
  const countEl = document.getElementById('photo-count');
  if (!countEl) return;
  if (input.files && input.files.length > 0) {
    const names = Array.from(input.files).map(f => f.name).slice(0, 2).join(', ');
    const extra = input.files.length > 2 ? ` (+${input.files.length - 2} more)` : '';
    countEl.textContent = `✓ ${input.files.length} photo${input.files.length > 1 ? 's' : ''} selected: ${names}${extra}`;
    countEl.style.color = 'var(--g)';
  } else {
    countEl.textContent = 'Accepted formats: JPG, PNG and WebP.';
    countEl.style.color = 'var(--muted)';
  }
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('#')[0].split('?')[0];
    const isCurrent = (linkPath === currentPath) ||
                      (currentPath === '' && linkPath === 'index.html') ||
                      (currentPath === 'property.html' && linkPath === 'search.html');
    if (isCurrent) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

function filterProps() {
  const l = (document.getElementById('loc').value || '').toLowerCase();
  const t = document.querySelector('input[name=type]:checked').value;
  const p = +document.getElementById('maxprice').value;
  let c = 0;
  document.querySelectorAll('#results .property').forEach(x => {
    const ok = x.dataset.location.includes(l) && (t === 'all' || x.dataset.type === t) && +x.dataset.price <= p;
    x.style.display = ok ? '' : 'none';
    if (ok) c++;
  });
  document.getElementById('count').textContent = c + ' example properties';
}

function resetProps() {
  document.getElementById('loc').value = '';
  document.getElementById('maxprice').value = '999999';
  document.querySelector('input[name=type][value=all]').checked = true;
  filterProps();
}

function sortProps() {
  const e = document.getElementById('results');
  const a = [...e.children];
  const v = +document.getElementById('sort').value;
  a.sort((x, y) => v === 1 ? +x.dataset.price - +y.dataset.price : v === 2 ? +y.dataset.price - +x.dataset.price : 0)
   .forEach(x => e.appendChild(x));
}

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
  renderCompare();
  updateCompareBadges();

  // If page loaded with #list or #list-section, scroll to it smoothly
  if (location.hash === '#list' || location.hash === '#list-section') {
    setTimeout(() => {
      const el = document.getElementById('list-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  // Forms demo feedback
  [['enquiry', 'enqnotice'], ['listing', 'listnotice'], ['contact', 'contactnotice']].forEach(([id, n]) => {
    const f = document.getElementById(id);
    if (f) {
      f.addEventListener('submit', e => {
        e.preventDefault();
        const noticeEl = document.getElementById(n);
        if (noticeEl) noticeEl.style.display = 'block';
        if (id === 'listing') {
          updateListingPreview();
        }
      });
    }
  });

  // Search query sync
  const q = new URLSearchParams(location.search).get('location');
  if (q && document.getElementById('loc')) {
    document.getElementById('loc').value = q;
    filterProps();
  }
});


// Interactive Total Cost Estimator (Compare Page)
function updateCostCalculator() {
  const rentInput = document.getElementById('calc-rent');
  const maintInput = document.getElementById('calc-maint');
  const utilInput = document.getElementById('calc-util');

  if (!rentInput || !maintInput || !utilInput) return;

  const rent = +rentInput.value;
  const maint = +maintInput.value;
  const util = +utilInput.value;

  const rentVal = document.getElementById('calc-rent-val');
  const maintVal = document.getElementById('calc-maint-val');
  const utilVal = document.getElementById('calc-util-val');

  if (rentVal) rentVal.textContent = '₹' + rent.toLocaleString('en-IN');
  if (maintVal) maintVal.textContent = '₹' + maint.toLocaleString('en-IN');
  if (utilVal) utilVal.textContent = '₹' + util.toLocaleString('en-IN');

  const sumRent = document.getElementById('summary-rent');
  const sumMaint = document.getElementById('summary-maint');
  const sumUtil = document.getElementById('summary-util');
  const sumDeposit = document.getElementById('summary-deposit');
  const sumTotal = document.getElementById('summary-total');

  if (sumRent) sumRent.textContent = '₹' + rent.toLocaleString('en-IN');
  if (sumMaint) sumMaint.textContent = '₹' + maint.toLocaleString('en-IN');
  if (sumUtil) sumUtil.textContent = '₹' + util.toLocaleString('en-IN');
  if (sumDeposit) sumDeposit.textContent = '₹' + (rent * 2).toLocaleString('en-IN') + ' (approx 2 mos)';
  if (sumTotal) sumTotal.textContent = '₹' + (rent + maint + util).toLocaleString('en-IN');
}

// Ensure calculator updates on load if present
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('calc-rent')) {
    updateCostCalculator();
  }
});
