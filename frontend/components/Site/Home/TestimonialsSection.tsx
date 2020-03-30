import React from 'react'
import HomeSection from './HomeSection'
import Testimonial from './Testimonial'

const data = [
  {
    quote:
      "I love that I'm finally keeping up with a journal for the first time in my life! It's so much easier to commit and stick to it when I also feel like I'm doing such wonderful things for my English, and even making new friends along the way!",
    speaks: ['Spanish'],
    writes: ['English'],
    name: 'Linda Villaneva',
    picture: 'images/testimonials/testimonial1.jpg',
  },
  {
    quote:
      "I've been struggling so badly for so long to find a way to improve things like grammar and speaking more naturally. I love both using the writing process for this and also getting such great feedback from native spearkers.",
    speaks: ['English', 'Norwegian'],
    writes: ['French', 'German'],
    name: 'Jordan Litwin',
    picture: 'images/testimonials/testimonial2.jpg',
  },
  {
    quote:
      "My favorite feature by far is how easy it is to give and receive comments right where they belong in someone's post. I also love being able to see my statistics - it makes me want to keep helping Chinese learners!",
    speaks: ['Chinese'],
    writes: ['English', 'Portuguese', 'Thai'],
    name: 'Jessica Wang',
    picture: 'images/testimonials/testimonial3.jpg',
  },
]

const TestimonialsSection = () => {
  const testimonials = data.map((testimonial, i) => {
    return <Testimonial {...testimonial} key={i} />
  })
  return (
    <HomeSection sectionHeading="What Journalers are saying" grey>
      <div className="testimonials">
        {testimonials}

        <style jsx>{`
          .testimonials {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, auto));
            grid-gap: 30px;
            justify-content: space-evenly;
          }
          @media screen and (min-width: 550px) {
            .testimonials {
              grid-template-columns: repeat(auto-fill, minmax(370px, auto));
            }
          }
        `}</style>
      </div>
    </HomeSection>
  )
}

export default TestimonialsSection
