import { NextResponse } from "next/server";

/**
 * Restaurant Onboarding API Route
 *
 * This API relies primarily on Formik + Yup validation on the frontend.
 * Server-side validation is minimal and focused on basic security checks.
 * Detailed validation (email format, phone patterns, etc.) is handled by Formik.
 */

// Basic server-side validation (minimal security checks)
const basicValidation = (data) => {
  const errors = [];

  // Check for required fields (basic presence check only)
  const requiredFields = [
    "restaurantName",
    "ownerName",
    "email",
    "address",
    "city",
    "state",
    "postalCode",
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || !String(data[field]).trim()) {
      errors.push(`${field} is required`);
    }
  });

  // Basic email format check (very lenient)
  if (data.email && !String(data.email).includes("@")) {
    errors.push("Invalid email format");
  }

  return errors;
};

// Sanitize and format data (trusting Formik for validation, focusing on security)
const sanitizeRestaurantData = (data) => {
  return {
    restaurantName: String(data.restaurantName || "").trim(),
    ownerName: String(data.ownerName || "").trim(),
    email: String(data.email || "")
      .trim()
      .toLowerCase(),
    phone: String(data.phone || "").trim(),
    address: String(data.address || "").trim(),
    city: String(data.city || "").trim(),
    state: String(data.state || "").trim(),
    postalCode: String(data.postalCode || "").trim(),
    country: String(data.country || "").trim(),
    website: String(data.website || "").trim(),
    description: String(data.description || "").trim(),
    // Include tax fields if provided (Formik handles validation)
    gstin: data.gstin ? String(data.gstin).trim() : undefined,
    vat: data.vat ? String(data.vat).trim() : undefined,
    // Server-side metadata
    submittedAt: data.submittedAt || new Date().toISOString(),
    status: "pending", // Default status for new applications
  };
};

// Mock database storage (replace with actual database integration)
const saveRestaurantApplication = async (restaurantData) => {
  // In a real application, you would save this to a database
  // For now, we'll just log it and simulate success
  console.log("Restaurant Application Submitted:", {
    ...restaurantData,
    id: `rest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  });

  // Simulate async database operation
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    success: true,
    applicationId: `REST-${Date.now()}`,
    message: "Application submitted successfully",
  };
};

// Send notification email (mock implementation)
const sendApplicationNotification = async (restaurantData) => {
  // In a real application, you would integrate with an email service
  // like SendGrid, AWS SES, or similar
  console.log(
    "Sending application notification email for:",
    restaurantData.restaurantName
  );

  // Mock email content
  const emailContent = {
    to: restaurantData.email,
    subject: "Restaurant Application Received - Zestro",
    html: `
      <h2>Thank you for your interest in Zestro!</h2>
      <p>Dear ${restaurantData.ownerName},</p>
      <p>We have received your restaurant onboarding application for <strong>${restaurantData.restaurantName}</strong>.</p>
      <p>Our team will review your application and contact you within 2-3 business days.</p>
      <p>Application Details:</p>
      <ul>
        <li>Restaurant: ${restaurantData.restaurantName}</li>
        <li>Location: ${restaurantData.city}, ${restaurantData.state}</li>
        <li>Country: ${restaurantData.country}</li>
      </ul>
      <p>Best regards,<br>The Zestro Team</p>
    `,
  };

  // Simulate email sending
  return { success: true, emailContent };
};

export async function POST(request) {
  try {
    // Parse request body
    const data = await request.json();

    // Basic server-side validation (trusting Formik for detailed validation)
    const validationErrors = basicValidation(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Basic validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize and format the data
    const sanitizedData = sanitizeRestaurantData(data);

    // Check for duplicate applications (by email)
    // In a real app, you'd check your database for existing applications
    // For now, we'll skip this check

    // Save the application to database
    const saveResult = await saveRestaurantApplication(sanitizedData);

    if (!saveResult.success) {
      throw new Error("Failed to save application");
    }

    // Send confirmation email to the restaurant owner
    try {
      await sendApplicationNotification(sanitizedData);
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Don't fail the entire request if email fails
    }

    // Send success response
    return NextResponse.json({
      success: true,
      message: "Restaurant application submitted successfully",
      applicationId: saveResult.applicationId,
      data: {
        restaurantName: sanitizedData.restaurantName,
        submittedAt: sanitizedData.submittedAt,
        status: sanitizedData.status,
      },
    });
  } catch (error) {
    console.error("Restaurant onboarding API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      message:
        "Method not allowed. Use POST to submit restaurant applications.",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      message:
        "Method not allowed. Use POST to submit restaurant applications.",
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      message:
        "Method not allowed. Use POST to submit restaurant applications.",
    },
    { status: 405 }
  );
}
