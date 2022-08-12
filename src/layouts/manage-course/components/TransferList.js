/* eslint-disable react/prop-types */
import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { scrollSetting } from "utils/classUltis";
import { Typography } from "@mui/material";
import SoftTypography from "components/SoftTypography";

function not(a, b) {
  return a.filter(({ value }) => b.findIndex((item) => item.value === value) === -1);
}

function intersection(a, b) {
  return a.filter(({ value }) => b.findIndex((item) => item.value === value) !== -1);
}

export default function TransferList({
  onChange,
  data,
  selected,
  elevation,
  leftTitle,
  rightTitle,
}) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (name, value) => () => {
    const currentIndex = checked.findIndex((item) => item.value === value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({ name, value });
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  React.useEffect(() => {
    if (data && selected) {
      setLeft(
        data.filter((item) =>
          selected ? (selected.findIndex((e) => e.value === item.value) >= 0 ? false : true) : true
        )
      );
      setRight(selected);
    } else {
      setLeft([]);
      setRight([]);
    }
  }, [data, selected]);

  React.useEffect(() => {
    onChange && onChange(right.map((item) => item.value));
  }, [right, onChange]);

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items, title) => (
    <Paper square elevation={elevation}>
      {title && <SoftTypography variant="h6">{title}</SoftTypography>}
      <List
        sx={{ ...scrollSetting(), width: 200, height: 200 }}
        dense
        component="div"
        role="list"
        disablePadding
      >
        {items.map(({ name, value }, index) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={index}
              sx={{ height: 40, p: 1, borderRadius: 1 }}
              role="listitem"
              button
              onClick={handleToggle(name, value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.findIndex((item) => item.value === value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left, leftTitle)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, rightTitle)}</Grid>
    </Grid>
  );
}
