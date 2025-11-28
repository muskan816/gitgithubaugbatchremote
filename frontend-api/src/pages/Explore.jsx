// src/pages/Explore.jsx
import { FaArrowRightLong } from "react-icons/fa6";

import Carousel from "../components/Carousel";
import SearchBar from "../components/Search";

// Layout
import CarouselRow from "../components/CarouselRow";

// Cards
import LocationCard from "../components/cards/LocationCard";
import FeaturedTrekCard from "../components/cards/FeaturedTrekCard";
import StayCard from "../components/cards/StayCard";
// import CollectionCard from "../components/cards/CollectionCard";
import HostCard from "../components/cards/HostCard";
// import TestimonialCard from "../components/cards/TestimonialCard";
import BlogCard from "../components/cards/BlogCard";
import { useNavigate } from "react-router-dom";

const Explore = () => {

  const navigate = useNavigate();

  // ---- dummy data (replace with API later) ----
  const locations = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTro1QNI4CaE9T6BqHnus2zF2b3qjEKtLdjNw&s",
      city: "Maharashtra",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQkmWT5QIJlK6ob_s7vCUnDToVfQsnuX6oA&s",
      city: "Delhi",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3hDMXgzDyh3dxhGwf1NYpp3JNvPVaDIDpvw&s",
      city: "Karnataka",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRkZVisbEAKoMxM1KC8gzWAUGPJcAoCzQtw&s",
      city: "Tamil Nadu",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNog-Vu51FGs_oRMmFkxxTBU9cOFIs0dzVCg&s",
      city: "West Bengal",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy76wDwDS53uxpxOh-gXbyRUNT1Vu2ZjnpKQ&s",
      city: "Rajasthan",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8AE3a3M-iE4YIxpG9XsZxKRpTDwpgN0UCcQ&s",
      city: "Telangana",
    },
  ];

  const featuredTreks = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxrlV4A5haFQWrR9X94Xpsr_X-s1BppvW-PQ&s",
      title: "Kedarkantha Summit Trek",
      days: "5D • 4N",
      level: "Easy–Moderate",
      price: "₹7,999",
      location: "Uttarakhand, India",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN4KudN4rb5HWJOjTvOxedTsL6zW18Gjahzw&s",
      title: "Valley of Flowers Trek",
      days: "6D • 5N",
      level: "Moderate",
      price: "₹10,499",
      location: "Uttarakhand, India",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8CoSnhLkKkMXyRxLV5mMe7DUpqoY9GlRFA&s",
      title: "Hampta Pass Trek",
      days: "5D • 4N",
      level: "Moderate",
      price: "₹9,299",
      location: "Himachal Pradesh, India",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Vz30fuMB2ZpFl3flT0oEdW8-rru2XrbXtA&s",
      title: "Sand Dunes Desert Safari",
      days: "2D • 1N",
      level: "Easy",
      price: "₹3,499",
      location: "Jaisalmer, Rajasthan",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN4KudN4rb5HWJOjTvOxedTsL6zW18Gjahzw&s",
      title: "Valley of Flowers Trek",
      days: "6D • 5N",
      level: "Moderate",
      price: "₹10,499",
      location: "Uttarakhand, India",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN4KudN4rb5HWJOjTvOxedTsL6zW18Gjahzw&s",
      title: "Valley of Flowers Trek",
      days: "6D • 5N",
      level: "Moderate",
      price: "₹10,499",
      location: "Uttarakhand, India",
    },
  ];

  const staysNear = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Lakeside Wooden Cabin",
      location: "Nainital, Uttarakhand",
      price: "₹2,200 / night",
      rating: 4.7,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Tea Estate Bungalow",
      location: "Munnar, Kerala",
      price: "₹2,900 / night",
      rating: 4.9,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LF4zZ_fpBFoHPztZeUByE2lfi-pr7Kno0Q&s",
      title: "Mountain View Homestay",
      location: "Manali, Himachal",
      price: "₹1,800 / night",
      rating: 4.8,
    },
  ];

  const collections = [
    {
      title: "Weekend Getaways",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOLnQ3UsdL6hKxjgcaWdbRE03Zc5jQW3dtQ&s",
      count: "120+ stays",
    },
    {
      title: "For Solo Travellers",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOLnQ3UsdL6hKxjgcaWdbRE03Zc5jQW3dtQ&s",
      count: "80+ experiences",
    },
    {
      title: "Luxury Retreats",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOLnQ3UsdL6hKxjgcaWdbRE03Zc5jQW3dtQ&s",
      count: "45+ villas",
    },
    {
      title: "Budget Backpacks",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOLnQ3UsdL6hKxjgcaWdbRE03Zc5jQW3dtQ&s",
      count: "100+ trips",
    },
    {
      title: "Budget Backpacks",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOLnQ3UsdL6hKxjgcaWdbRE03Zc5jQW3dtQ&s",
      count: "100+ trips",
    },
    {
      title: "Budget Backpacks",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOLnQ3UsdL6hKxjgcaWdbRE03Zc5jQW3dtQ&s",
      count: "100+ trips",
    },
  ];

  const hosts = [
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      name: "Aditi Sharma",
      role: "Trek Leader",
      location: "Rishikesh, Uttarakhand",
      tripsHosted: 120,
      rating: 4.9,
    },
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      name: "Rahul Verma",
      role: "Homestay Owner",
      location: "Manali, Himachal",
      tripsHosted: 85,
      rating: 4.8,
    },
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      name: "Tsering Dorje",
      role: "Local Guide",
      location: "Leh, Ladakh",
      tripsHosted: 60,
      rating: 5.0,
    },
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      name: "Aditi Sharma",
      role: "Trek Leader",
      location: "Rishikesh, Uttarakhand",
      tripsHosted: 120,
      rating: 4.9,
    },
    {
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      name: "Aditi Sharma",
      role: "Trek Leader",
      location: "Rishikesh, Uttarakhand",
      tripsHosted: 120,
      rating: 4.9,
    },
  ];

  // const testimonials = [
  //   {
  //     name: "Sneha & Karan",
  //     trip: "Kedarkantha Trek",
  //     text: "Flawlessly organized – from stay to food to safety. Our first winter trek felt super secure.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Vivek",
  //     trip: "Mountain View Homestay",
  //     text: "Felt like staying with family. The host helped us plan our entire itinerary.",
  //     image:
  //       "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Priya",
  //     trip: "Valley of Flowers Trek",
  //     text: "Everything was exactly as shown. Clean camps and very friendly guides.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Priya",
  //     trip: "Valley of Flowers Trek",
  //     text: "Everything was exactly as shown. Clean camps and very friendly guides.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  //   {
  //     name: "Priya",
  //     trip: "Valley of Flowers Trek",
  //     text: "Everything was exactly as shown. Clean camps and very friendly guides.",
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //   },
  // ];

  const blogs = [
    {
      title: "Top 7 Himalayan Treks for First Timers",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
      readTime: "6 min read",
    },
    {
      title: "How to Start Hosting Your Homestay",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
      readTime: "5 min read",
    },
    {
      title: "Best Season to Visit Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
      readTime: "4 min read",
    },
    {
      title: "Best Season to Visit Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
      readTime: "4 min read",
    },
    {
      title: "Best Season to Visit Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
      readTime: "4 min read",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[360px] md:h-[350px]">
        <Carousel />
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="pointer-events-auto w-11/12 md:w-3/5 lg:w-1/2 mb-10">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <CarouselRow
        title="Top Treks in Uttarakhand"
        subtitle="Explore the most loved states and cities"
        actionLabel="View all"
        backgroundClass="bg-white"
      >
        {locations.map((loc, idx) => (
          <LocationCard
            key={idx}
            image={loc.image}
            city={loc.city}
            onClick={() => navigate(`/place/${loc.city}`)}
          />
        ))}
      </CarouselRow>

      {/* Featured Treks */}
      <CarouselRow
        title="Featured Treks & Experiences"
        subtitle="Handpicked adventures curated by verified hosts"
        actionLabel="Explore all treks"
        backgroundClass="bg-[#FFF9EC]"
      >
        {featuredTreks.map((trek, idx) => (
          <FeaturedTrekCard key={idx} {...trek} />
        ))}
      </CarouselRow>

      {/* Stays Near You */}
      <CarouselRow
        title="Treks Nearby You"
        subtitle="Homestays, cabins and cottages near your location"
        actionLabel="View all stays"
        backgroundClass="bg-white"
      >
        {staysNear.map((stay, idx) => (
          <StayCard key={idx} {...stay} />
        ))}
      </CarouselRow>
      {/* Top Rated Treks */}
      <CarouselRow
        title="Top Rated Treks"
        subtitle="Homestays, cabins and cottages near your location"
        actionLabel="View all stays"
        backgroundClass="bg-[#FFF9EC]"
      >
        {staysNear.map((stay, idx) => (
          <StayCard key={idx} {...stay} />
        ))}
      </CarouselRow>

      {/* Top Hosts */}
      <CarouselRow
        title="Top Rated Hosts"
        subtitle="Trusted experts who know the mountains, cities and stories"
        actionLabel="Meet all hosts"
        backgroundClass="bg-white"
      >
        {hosts.map((host, idx) => (
          <HostCard key={idx} {...host} />
        ))}
      </CarouselRow>

      {/* Testimonials */}
      {/* <CarouselRow
        title="Stories from our travellers"
        subtitle="Real trips, real memories shared by our community"
        backgroundClass="bg-white"
      >
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </CarouselRow> */}

      {/* Blogs */}
      <CarouselRow
        title="Travel Guides & Tips"
        subtitle="Learn before you go – curated by our team and hosts"
        actionLabel="Read all articles"
        backgroundClass="bg-[#FFF9EC]"
      >
        {blogs.map((b, idx) => (
          <BlogCard key={idx} {...b} />
        ))}
      </CarouselRow>

      {/* Become a Host CTA */}
      <section className="py-10 px-4 md:px-12 bg-white">
        <div className="bg-[#FFF4D6] border border-yellow-300 rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#C59A2F] mb-2">
              Become a Host
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-xl">
              Turn your home, trek, or local experience into an income stream.
              List your stay or adventure, set your own prices, and host
              travellers your way.
            </p>
          </div>
          <button className="gold-cta-x h-12 relative inline-flex items-center px-8 md:px-12 py-3 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg cursor-pointer hover:bg-[#b68923]">
            Start Hosting
            <span className="ml-2">
              <FaArrowRightLong />
            </span>
          </button>
        </div>
      </section>

      {/* Small scrollbar-hide helper for all horizontal rows (if not global already) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Explore;
