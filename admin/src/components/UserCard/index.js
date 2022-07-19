import { Box, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserCard = (props) => {
  const { name, subtitle, avatar, onClick, size, headLink, subLink } = props;
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap="0.5rem"
      className="user-dropdown flex flex-row items-center gap-2"
      onClick={onClick}
    >
      <Avatar
        className="cursor-pointer"
        alt={avatar}
        src={avatar}
        sx={{
          height: size === "small" ? 30 : 40,
          width: size === "small" ? 30 : 40,
        }}
      />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography
          variant={size === "small" ? "caption" : "subtitle1"}
          sx={{
            fontWeight: size === "small" ? 400 : 500,
            color: (theme) => theme.palette.text.main,
          }}
        >
          {headLink ? <Link to={headLink}>{name}</Link> : name}
        </Typography>
        <Typography
          sx={{
            fontSize: size === "small" ? 10 : 12,
            color: "#A3A3A3",
          }}
        >
          {subLink ? <Link to={subLink}>{subtitle}</Link> : subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  avatar: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  headLink: PropTypes.string,
  subLink: PropTypes.string,
};
export default UserCard;
