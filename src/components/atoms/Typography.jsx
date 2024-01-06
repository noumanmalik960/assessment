import {StyleSheet, Text} from 'react-native';
import {colors} from '../../assets/colors';

const Typography = ({as, text, style, ...props}) => {
  const getTypographyStyle = () => {
    switch (as) {
      case 'title':
        return styles.title;
      case 'heading':
        return styles.heading;
      case 'subheading':
        return styles.subheading;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      case 'link':
        return styles.link;
      default:
        return {};
    }
  };

  return (
    <Text style={[styles.base, getTypographyStyle(), style]} {...props}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.black,
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.title,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    color: colors.grey,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    color: colors.caption,
  },
  link: {
    fontSize: 16,
    color: colors.orange,
  },
});

export default Typography;
