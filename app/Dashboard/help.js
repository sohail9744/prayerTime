import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "How can I view a template before deciding to use it?",
    answer: "Discovering your perfect template is easy! Navigate to our platform's 'Screens' section. There, you'll find a 'Preview URL' alongside each template. Click on it to get a live preview. This feature lets you explore how the template looks and feels"
  },
  {
    question: "What's the easiest way to display a template on my TV?",
    answer: "Bringing the template to your TV screen is straightforward. First, locate the template you wish to use in the 'Screens' section of our platform and copy the URL provided. Then, simply open the Chrome browser on your TV and paste the URL into the address bar. Voilà! Your chosen template will now be live on your TV, ready to guide your community's prayer times."
  },
  {
    question: "How do I adjust prayer times?",
    answer: "You can adjust prayer times in the 'Prayer Time' section of the mosque management system."
  },
  {
    question: "How do I configure the Manual location?",
    answer: "You can configure the location in the 'Configuration' section by adding your mosque's location details."
  },
  {
    question: "How do I change the screen template?",
    answer: "By default a theme is selected in 'Templates' section on our platform. There, you'll find a variety of templates tailored to different needs and preferences. Preview the templates to see which one aligns with your mosque's schedule and style."
  },
  {
    question: "Where can I find help and guidance?",
    answer: "You can find help and guidance in the 'Help' section, where we have provided user manual guides and FAQs."
  },
  {
    question: "Can I use the application without the internet?",
    answer: "No, you can't use the application without an internet connection. However, once you complete the setup on screen, please ensure not to refresh the page. The setup will automatically remain the same for a month, unless the TV or device loses power. This means that after the initial setup with an internet connection, your selected settings should persist without needing to reconnect, as long as the device remains powered on."
  }
]


export default function Help() {
  return (
    <div>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            defaultChecked
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant='h6' textTransform='capitalize'>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='subtitle1'>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
