import { resumeData } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CareerSummary from './components/CareerSummary';
import CoreCompetencies from './components/CoreCompetencies';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Teaching from './components/Teaching';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero profile={resumeData.profile} />
      <CareerSummary data={resumeData.careerSummary} />
      <CoreCompetencies data={resumeData.coreCompetencies} />
      <Journey data={resumeData.journey} />
      <Experience data={resumeData.experience} />
      <Projects data={resumeData.projects} otherProjects={resumeData.otherProjects} />
      <Skills data={resumeData.skills} />
      <Leadership data={resumeData.leadership} />
      <Teaching data={resumeData.teaching} />
      <Contact data={resumeData.contact} />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
