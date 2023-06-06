import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Theme } from "@mui/material/styles";

const icon = (
  <Paper
    sx={{ m: 1, width: 100, height: 100, position: "absolute" }}
    elevation={4}
  >
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme: Theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SlideFromContainer() {
  const [step, setStep] = React.useState(0);
  const [prevStep, setPrivStep] = React.useState(1);
  const containerRef = React.useRef(null);

  const goBack = () => {
    setPrivStep(step);
    setStep(step - 1);
  };
  const goForward = () => {
    setPrivStep(step);
    setStep(step + 1);
  };

  const getDir: (index: number) => "right" | "left" = (index) => {
    switch (`${prevStep}:${step}`) {
      case `${index - 1}:${index}`:
        return "right";
      case `${index}:${index + 1}`:
        return "left";
      case `${index + 1}:${index}`:
        return "left";
      case `${index}:${index - 1}`:
        return "right";
    }
  };

  return (
    <Box
      sx={{
        height: 500,
        width: 240,
        display: "flex",
        padding: 2,
        borderRadius: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "grey.100" : "grey.900",
        overflow: "hidden"
      }}
      ref={containerRef}
    >
      <Box sx={{ width: 200 }}>
        step: {step} <br />
        priv: {prevStep} <br />
        dir: {getDir()} <br />
        <Button disabled={step == 0} onClick={goBack}>
          Priv
        </Button>
        <Button disabled={step == 2} onClick={goForward}>
          Next
        </Button>
        <Slide
          direction={getDir(0)}
          in={step == 0}
          container={containerRef.current}
        >
          {icon}
        </Slide>
        <Slide
          direction={getDir(1)}
          in={step == 1}
          container={containerRef.current}
        >
          {icon}
        </Slide>
        <Slide
          direction={getDir(2)}
          in={step == 2}
          container={containerRef.current}
        >
          {icon}
        </Slide>
      </Box>
    </Box>
  );
}
