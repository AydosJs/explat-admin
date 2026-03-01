# Admin Sidebar: Which Pages Each Role Sees

For each role, this doc lists **which pages (sidebar links) are shown**. Visibility depends on Django permissions (view/change) per user; items without permission are hidden.

---

## Role 1: Main admin (staff / superuser)

**Login URL:** `/admin/`  
**Who:** Staff or superuser.

**Pages shown in sidebar** (only if user has view or change permission for that model):

| Section | Page (label) | Link (example) |
|--------|--------------|-----------------|
| — | Дашборд | `/admin/dashboard/` |
| — | Pay in | `/admin/core/transaction/` |
| — | Pay out | `/admin/core/payout/` |
| — | Мерчанты | `/admin/core/merchant/` |
| — | Трейдеры | `/admin/core/trader/` |
| — | Реквизиты | `/admin/core/requisite/` |
| — | Устройства | `/admin/core/p2pdevice/` |
| — | Апелляции | `/admin/core/appeal/` |
| **Токены** | Токены для выплат | `/admin/core/payouttoken/` |
| **Токены** | Токены пополнения баланса | `/admin/core/balancetopuptoken/` |
| **Токены** | Токены трейдеров | `/admin/core/tradertoken/` |
| **Банк и СМС** | Банки | `/admin/core/smsbank/` |
| **Банк и СМС** | SMS шаблоны | `/admin/core/smstemplate/` |
| **Банк и СМС** | SMS отправители | `/admin/core/smssender/` |
| **Еще** | Логи балансов | `/admin/core/balancelog/` |
| **Еще** | Логи Callback'ов | `/admin/callback-logs/` (needs `is_staff`) |
| **Еще** | Резерв оплат | `/admin/core/transactionreservation/` |

**Total: 17 pages** (each shown only if the user has permission for that model; Callback logs require staff).

---

## Role 2: Trader

**Login URL:** `/trader-admin-panel/`  
**Who:** Trader users (separate admin site).

**Pages shown in sidebar** (only if user has view or change for that model):

| # | Page (label) | Link (example) |
|---|----------------|-----------------|
| 1 | Дашборд | `/trader-admin-panel/core/dashboard/` |
| 2 | Реквизиты | `/trader-admin-panel/core/requisite/` |
| 3 | Токены для выплат (PayoutToken) | `/trader-admin-panel/core/payouttoken/` |
| 4 | Pay in (Transaction) | `/trader-admin-panel/core/transaction/` |
| 5 | Pay out (Payout) | `/trader-admin-panel/core/payout/` |
| 6 | Логи балансов (BalanceLog) | `/trader-admin-panel/core/balancelog/` |
| 7 | Апелляции (Appeal) | `/trader-admin-panel/core/appeal/` |

**Total: 7 pages.**

---

## Role 3: Merchant

**Login URL:** `/merchant-admin-panel/`  
**Who:** Merchant users (separate admin site).

**Pages shown in sidebar** (only if user has view or change for that model), in this order:

| # | Page (label) | Link (example) |
|---|----------------|-----------------|
| 1 | Дашборд | `/merchant-admin-panel/core/dashboard/` |
| 2 | Pay in (Transaction) | `/merchant-admin-panel/core/transaction/` |
| 3 | Pay out (Payout) | `/merchant-admin-panel/core/payout/` |
| 4 | Апелляции (Appeal) | `/merchant-admin-panel/core/appeal/` |

**Total: 4 pages.**

---

## Quick reference: role → pages

| Role | URL prefix | Pages shown (sidebar) |
|------|------------|------------------------|
| **Main admin** | `/admin/` | Дашборд, Pay in, Pay out, Мерчанты, Трейдеры, Реквизиты, Устройства, Апелляции; Токены (3); Банк и СМС (3); Еще — Логи балансов, Логи Callback'ов, Резерв оплат (**17** total) |
| **Trader** | `/trader-admin-panel/` | Дашборд, Реквизиты, PayoutToken, Transaction, Payout, BalanceLog, Appeal (**7** total) |
| **Merchant** | `/merchant-admin-panel/` | Дашборд, Transaction, Payout, Appeal (**4** total) |

---

## How visibility is decided

- **Main admin:** Each item is shown if `has_view_permission` or `has_change_permission` for that model; “Логи Callback'ов” is shown if `user.is_staff`. Implemented in `core/custom_admin.py` → `get_sidebar_list()`.
- **Trader / Merchant:** Each item is shown if the user has **view** or **change** permission for that model on that admin site. Implemented in `core/trader_admin.py` and `core/merchant_admin.py` → `get_sidebar_list()`.

To change which pages a role sees, adjust Django permissions (user/group) or change which models are registered on each admin site in `core/custom_admin.py`, `core/trader_admin.py`, and `core/merchant_admin.py`.
