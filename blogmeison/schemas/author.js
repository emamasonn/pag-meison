export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "profile",
      title: "Profile",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      title: "Social Media",
      name: "socialMedia",
      type: "object",
      fields: [
        {
          title: "URL GitHub",
          name: "github",
          type: "string",
        },
        {
          title: "URL Twitter",
          name: "twitter",
          type: "string",
        },
        {
          title: "URL LinkedIn",
          name: "linkedin",
          type: "string",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
