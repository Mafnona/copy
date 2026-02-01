<script>
        // Room data
        const rooms = [
            {
                id: 1,
                name: "Deluxe Suite",
                description: "A spacious suite with panoramic views, king bed, and separate living area.",
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                price: 299,
                features: ["King Bed", "City View", "45 m²", "Free WiFi"]
            },
            {
                id: 2,
                name: "Executive Room",
                description: "Modern room with workspace, comfortable queen bed, and premium amenities.",
                image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                price: 229,
                features: ["Queen Bed", "Desk", "32 m²", "Smart TV"]
            },
            {
                id: 3,
                name: "Garden View Room",
                description: "Peaceful room overlooking our private gardens with comfortable seating area.",
                image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                price: 199,
                features: ["Double Bed", "Garden View", "28 m²", "Balcony"]
            },
            {
                id: 4,
                name: "Premium Suite",
                description: "Luxurious suite with separate bedroom, living area, and marble bathroom.",
                image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                price: 399,
                features: ["King Bed", "City View", "55 m²", "Jacuzzi"]
            },
            {
                id: 5,
                name: "Standard Room",
                description: "Comfortable and efficient room with all essential amenities for a pleasant stay.",
                image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                price: 179,
                features: ["Queen Bed", "Street View", "25 m²", "Workspace"]
            },
            {
                id: 6,
                name: "Penthouse Suite",
                description: "Our most exclusive offering with private terrace, full kitchen, and premium service.",
                image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                price: 599,
                features: ["King Bed", "Panoramic View", "85 m²", "Private Terrace"]
            }
        ];

        // DOM elements
        const roomsGrid = document.getElementById('roomsGrid');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const bookingModal = document.getElementById('bookingModal');
        const modalClose = document.getElementById('modalClose');
        const bookingForm = document.getElementById('bookingForm');
        const roomTypeInput = document.getElementById('roomType');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Generate room cards
            rooms.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                roomCard.innerHTML = `
                    <img src="${room.image}" alt="${room.name}" class="room-image">
                    <div class="room-content">
                        <h3 class="room-title">${room.name}</h3>
                        <p class="room-description">${room.description}</p>
                        <div class="room-features">
                            ${room.features.map(feature => `
                                <div class="room-feature">
                                    <i class="fas fa-check"></i>
                                    <span>${feature}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="room-price">
                            <div>
                                <span class="price-amount">$${room.price}</span>
                                <span class="price-period"> / night</span>
                            </div>
                            <button class="book-button" data-room-id="${room.id}" data-room-name="${room.name}">Book Now</button>
                        </div>
                    </div>
                `;
                roomsGrid.appendChild(roomCard);
            });

            // Set minimum date for check-in to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('checkin').min = today;
            
            // Update checkout min date when checkin changes
            document.getElementById('checkin').addEventListener('change', function() {
                document.getElementById('checkout').min = this.value;
            });
        });

        // Mobile menu toggle
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Handle book now button clicks
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('book-button')) {
                const roomId = event.target.getAttribute('data-room-id');
                const roomName = event.target.getAttribute('data-room-name');
                
                // Set room type in modal
                roomTypeInput.value = roomName;
                
                // Show modal
                bookingModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });

        // Close modal
        modalClose.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        bookingModal.addEventListener('click', function(event) {
            if (event.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Handle booking form submission
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const roomType = document.getElementById('roomType').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your booking request for the ${roomType} from ${checkin} to ${checkout} for ${guests} guest(s) has been received. A confirmation will be sent to ${email}.`);
            
            // Reset form and close modal
            bookingForm.reset();
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset min dates
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('checkin').min = today;
            document.getElementById('checkout').min = today;
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
    </script>
