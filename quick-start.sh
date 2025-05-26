#!/bin/bash

# Quick Start Script for kesaru.me Development
# This script sets up the development environment quickly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 20 or later."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
    
    local node_version=$(node --version | sed 's/v//')
    local major_version=$(echo $node_version | cut -d. -f1)
    
    if [ "$major_version" -lt 18 ]; then
        print_error "Node.js version $node_version is too old. Please install Node.js 18 or later."
        exit 1
    fi
    
    print_success "Node.js $node_version is installed"
    
    if ! command_exists npm; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
    
    if ! command_exists git; then
        print_warning "Git is not installed. You may need it for version control."
    else
        print_success "Git $(git --version | cut -d' ' -f3) is installed"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    print_success "Dependencies installed successfully"
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            print_success "Created .env.local from .env.example"
            print_warning "Please review and update .env.local with your configuration"
        else
            cat > .env.local << EOF
NODE_ENV=development
PORT=3000
EOF
            print_success "Created basic .env.local file"
        fi
    else
        print_warning ".env.local already exists"
    fi
}

# Build the application
build_application() {
    print_status "Building the application..."
    
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Application built successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Type checking
    npm run type-check
    
    # Linting
    npm run lint
    
    # Production tests
    if [ -f "test.sh" ]; then
        print_status "Running production tests..."
        ./test.sh
    fi
    
    print_success "All tests passed"
}

# Start development server
start_dev_server() {
    print_status "Starting development server..."
    print_success "Development server will start on http://localhost:3000"
    print_warning "Press Ctrl+C to stop the server"
    echo ""
    
    npm run dev
}

# Display helpful information
show_info() {
    echo -e "\n${GREEN}🎉 Setup completed successfully!${NC}\n"
    echo -e "${YELLOW}Available commands:${NC}"
    echo "  npm run dev          - Start development server"
    echo "  npm run build        - Build for production"
    echo "  npm run start        - Start production server"
    echo "  npm run lint         - Run linter"
    echo "  npm run type-check   - Check TypeScript types"
    echo "  npm test             - Run tests"
    echo "  ./test.sh            - Run production tests"
    echo ""
    echo -e "${YELLOW}Useful files:${NC}"
    echo "  app/page.tsx         - Main homepage"
    echo "  app/layout.tsx       - Root layout"
    echo "  app/globals.css      - Global styles"
    echo "  .env.local           - Environment variables"
    echo "  DEPLOYMENT.md        - Deployment guide"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Review and update .env.local"
    echo "2. Customize the homepage in app/page.tsx"
    echo "3. Add your projects and content"
    echo "4. Configure GitHub secrets for deployment"
    echo "5. Run ./test.sh to validate your setup"
    echo ""
}

# Main function
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════╗"
    echo "║             Kesaru.me Quick Start                ║"
    echo "║           Development Setup Script               ║"
    echo "╚══════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    check_prerequisites
    install_dependencies
    setup_environment
    
    # Ask user what they want to do
    echo ""
    echo "What would you like to do?"
    echo "1. Build and test the application"
    echo "2. Start development server"
    echo "3. Just show information and exit"
    echo ""
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            build_application
            run_tests
            show_info
            ;;
        2)
            show_info
            start_dev_server
            ;;
        3)
            show_info
            ;;
        *)
            print_warning "Invalid choice. Showing information and exiting."
            show_info
            ;;
    esac
}

# Run main function
main "$@"
