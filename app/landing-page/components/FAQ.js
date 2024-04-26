import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);
  // const faqData = [
  //   {
  //     id: "panel1",
  //     question:
  //       "How do I contact customer support if I have a question or issue?",
  //     answer:
  //       "You can reach our customer support team by emailing support@email.com or calling our toll-free number. We're here to assist you promptly.",
  //   },
  //   {
  //     id: "panel2",
  //     question: "Can I return the product if it doesn't meet my expectations?",
  //     answer:
  //       "Absolutely! We offer a hassle-free return policy. If you're not completely satisfied, you can return the product within [number of days] days for a full refund or exchange.",
  //   },
  //   {
  //     id: "panel3",
  //     question: "What makes your product stand out from others in the market?",
  //     answer:
  //       "Our product distinguishes itself through its adaptability, durability, and innovative features. We prioritize user satisfaction and continually strive to exceed expectations in every aspect.",
  //   },
  //   {
  //     id: "panel4",
  //     question: "Is there a warranty on the product, and what does it cover?",
  //     answer:
  //       "Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance.",
  //   },
  // ];

  const faqData = [
    {
      id: "panel1",
      question: "How can I view a template before deciding to use it?",
      answer:
        "Discovering your perfect template is easy! Navigate to our platform's 'Screens' section. There, you'll find a 'Preview URL' alongside each template. Click on it to get a live preview. This feature lets you explore how the template looks and feels",
    },
    {
      id: "panel2",
      question: "What's the easiest way to display a template on my TV?",
      answer:
        "Bringing the template to your TV screen is straightforward. First, locate the template you wish to use in the 'Screens' section of our platform and copy the URL provided. Then, simply open the Chrome browser on your TV and paste the URL into the address bar. Voilà! Your chosen template will now be live on your TV, ready to guide your community's prayer times.",
    },
    {
      id: "panel3",
      question: "How do I adjust prayer times?",
      answer:
        "You can adjust prayer times in the 'Prayer Time' section of the mosque management system.",
    },
    {
      id: "panel4",
      question: "How do I configure the Manual location?",
      answer:
        "You can configure the location in the 'Configuration' section by adding your mosque's location details.",
    },
    {
      id: "panel5",
      question: "How do I change the screen template?",
      answer:
        "By default a theme is selected in 'Templates' section on our platform. There, you'll find a variety of templates tailored to different needs and preferences. Preview the templates to see which one aligns with your mosque's schedule and style.",
    },
    {
      id: "panel6",
      question: "Where can I find help and guidance?",
      answer:
        "You can find help and guidance in the 'Help' section, where we have provided user manual guides and FAQs.",
    },
    {
      id: "panel7",
      question: "Can I use the application without the internet?",
      answer:
        "No, you can't use the application without an internet connection. However, once you complete the setup on screen, please ensure not to refresh the page. The setup will automatically remain the same for a month, unless the TV or device loses power. This means that after the initial setup with an internet connection, your selected settings should persist without needing to reconnect, as long as the device remains powered on.",
    },
    {
      id: "panel8",
      question:
        "How do I contact customer support if I have a question or issue?",
      answer:
        "You can reach our customer support team by emailing support@email.com or calling our toll-free number. We're here to assist you promptly.",
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12, lg: 3 },
        pb: { xs: 8, sm: 16, lg: 3 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        {faqData.map((faq) => (
          <Accordion
            key={faq.id}
            expanded={expanded === faq.id}
            onChange={handleChange(faq.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${faq.id}-content`}
              id={`${faq.id}-header`}
            >
              <Typography component="h3" variant="subtitle2">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%", lg: "100%" } }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
