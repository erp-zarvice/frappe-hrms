<div align="center">
	<a href="https://edarmor.com">
		<img src="hrms/public/images/edarmor-hr-logo.svg" height="80px" width="80px" alt="Edarmor HR Logo">
	</a>
	<h2>Edarmor HR</h2>
	<p align="center">
		<p>Open Source, modern, and easy-to-use HR and Payroll Software by Edarmor Innovations</p>
	</p>

[![CI](https://github.com/frappe/hrms/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/frappe/hrms/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/frappe/hrms/branch/develop/graph/badge.svg?token=0TwvyUg3I5)](https://codecov.io/gh/frappe/hrms)

<a href="https://trendshift.io/repositories/10972" target="_blank"><img src="https://trendshift.io/api/badge/repositories/10972" alt="frappe%2Fhrms | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</div>

<div align="center">
	<img src=".github/hrms-hero.png"/>
</div>

<div align="center">
	<a href="https://edarmor.com">Website</a>
	-
	<a href="https://docs.edarmor.com/hr">Documentation</a>
</div>

## Edarmor HR

Edarmor HR is powered by Frappe's open-source framework and customized by Edarmor Innovations Pvt. Ltd. for enterprise needs. It has everything you need to drive excellence within the company. It's a complete HRMS solution with over 13 different modules right from Employee Management, Onboarding, Leaves, to Payroll, Taxation, and more!

## Motivation
When Edarmor Innovations team started growing in terms of size, we needed an open-source HR and Payroll software. We chose to build upon Frappe's excellent foundation and customize it for our enterprise clients' needs.

This solution is based on Frappe HR, which initially was a set of modules within ERP but version 14 onwards, became a separate mature product. We've enhanced it with our enterprise expertise and branding.

## Key Features

- **Employee Lifecycle**: From onboarding employees, managing promotions and transfers, all the way to documenting feedback with exit interviews, make life easier for employees throughout their life cycle.
- **Leave and Attendance**: Configure leave policies, pull regional holidays with a click, check-in and check-out with geolocation capturing, track leave balances and attendance with reports.
- **Expense Claims and Advances**: Manage employee advances, claim expenses, configure multi-level approval workflows, all this with seamless integration with ERP accounting.
- **Performance Management**: Track goals, align goals with key result areas (KRAs), enable employees to evaluate themselves, make managing appraisal cycles easy.
- **Payroll & Taxation**: Create salary structures, configure income tax slabs, run standard payroll, accomodate additional salaries and off cycle payments, view income breakup on salary slips and so much more.
- **Frappe HR Mobile App**: Apply for and approve leaves on the go, check-in and check-out, access employee profile right from the mobile app.

<details open>

<summary>View Screenshots</summary>
	<img src=".github/hrms-appraisal.png"/>
	<img src=".github/hrms-requisition.png"/>
	<img src=".github/hrms-attendance.png"/>
	<img src=".github/hrms-salary.png"/>
	<img src=".github/hrms-pwa.png"/>
</details>

### Under the Hood

- [**Framework**](https://github.com/frappe/frappe): A full-stack web application framework written in Python and Javascript. The framework provides a robust foundation for building web applications, including a database abstraction layer, user authentication, and a REST API.

- [**Frappe UI**](https://github.com/frappe/frappe-ui): A Vue-based UI library, to provide a modern user interface. The Frappe UI library provides a variety of components that can be used to build single-page applications on top of the Framework.

## Production Setup

### Managed Hosting

You can try [Frappe Cloud](https://frappecloud.com), a simple, user-friendly and sophisticated [open-source](https://github.com/frappe/press) platform to host Frappe applications with peace of mind.

It takes care of installation, setup, upgrades, monitoring, maintenance and support of your Frappe deployments. It is a fully featured developer platform with an ability to manage and control multiple Frappe deployments.

<div>
	<a href="https://frappecloud.com/hrms/signup" target="_blank">
		<picture>
			<source media="(prefers-color-scheme: dark)" srcset="https://frappe.io/files/try-on-fc-white.png">
			<img src="https://frappe.io/files/try-on-fc-black.png" alt="Try on Frappe Cloud" height="28" />
		</picture>
	</a>
</div>


## Development setup
### Docker
You need Docker, docker-compose and git setup on your machine. Refer [Docker documentation](https://docs.docker.com/).

#### For Private Repositories (Authentication Required)

If the `erp-zarvice/frappe` and `erp-zarvice/erpnext` repositories are private, you need to set up authentication:

**Step 1:** Create a GitHub Personal Access Token
- Go to https://github.com/settings/tokens/new
- Give it a name like "Docker Dev Environment"
- Select scope: `repo` (Full control of private repositories)
- Click "Generate token" and copy it

**Step 2:** Set up environment
```bash
git clone https://github.com/erp-zarvice/hrms
cd hrms/docker

# Create .env file from example
cp .env.example .env

# Edit .env and add your token:
# GITHUB_TOKEN=ghp_your_token_here
nano .env
```

**Step 3:** Start Docker
```bash
docker-compose up
```

#### For Public Repositories (No Authentication)

```bash
git clone https://github.com/erp-zarvice/hrms
cd hrms/docker
docker-compose up
```

**Note:** This will automatically install Frappe and ERPNext from the erp-zarvice repositories with Edarmor branding.

**By default, it clones the `develop` branch** for both Frappe and ERPNext. To use a different branch:
```bash
# Edit .env file or set inline:
FRAPPE_BRANCH=feature/whitelabeling ERPNEXT_BRANCH=develop docker-compose up
```

Wait for some time until the setup script creates a site. After that you can access `http://localhost:8000` in your browser and the login screen for HR should show up.

Use the following credentials to log in:

- Username: `Administrator`
- Password: `admin`

### Local

1. Set up bench by following the [Installation Steps](https://frappeframework.com/docs/user/en/installation) with custom Frappe repository
	```sh
	# Initialize bench with custom Frappe repository
	$ bench init --frappe-path https://github.com/erp-zarvice/frappe frappe-bench
	$ cd frappe-bench
	$ bench start
	```
2. In a separate terminal window, run the following commands
	```sh
	$ bench new-site hrms.local
	# Get ERPNext from custom repository
	$ bench get-app https://github.com/erp-zarvice/erpnext
	# Get HRMS from custom repository
	$ bench get-app https://github.com/erp-zarvice/hrms
	$ bench --site hrms.local install-app erpnext
	$ bench --site hrms.local install-app hrms
	$ bench --site hrms.local add-to-hosts
	```
3. You can access the site at `http://hrms.local:8000`

**Note:** This setup uses the Edarmor-branded versions of Frappe, ERPNext, and HRMS from erp-zarvice organization.

## Learning and Community

1. [Frappe School](https://frappe.school) - Learn Framework and ERP from the various courses by the maintainers or from the community.
2. [Documentation](https://docs.frappe.io/hr) - Extensive documentation for Frappe HR.
3. [User Forum](https://discuss.erpnext.com/) - Engage with the community of ERP users and service providers.
4. [Telegram Group](https://t.me/frappehr) - Get instant help from the community of users.


## Contributing

1. [Issue Guidelines](https://github.com/frappe/erpnext/wiki/Issue-Guidelines)
1. [Report Security Vulnerabilities](https://erpnext.com/security)
1. [Pull Request Requirements](https://github.com/frappe/erpnext/wiki/Contribution-Guidelines)


## Logo and Trademark Policy

Please read our [Logo and Trademark Policy](TRADEMARK_POLICY.md).

<br />
<br />
<div align="center" style="padding-top: 0.75rem;">
	<a href="https://edarmor.com" target="_blank">
		<img src="hrms/public/images/edarmor-hr-logo.svg" alt="Edarmor Innovations" height="28"/>
	</a>
</div>

